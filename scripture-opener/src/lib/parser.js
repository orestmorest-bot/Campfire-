// Finds Bible references in text, including the loose way people say them out loud.
//
// Examples it understands (after speech recognition turns the words into text):
//   "John 3:16"                         "John 3 16"                   "John 316"
//   "John chapter 3 verse 16"           "John chapter three verse sixteen"
//   "First Corinthians 13 4 through 8"  "1st John 4:8"                "1 John 4 8"
//   "Psalm 83 verse 18"                 "Psalm eighty three eighteen"
//   "Matthew 24 verses 14 and 15"       "Revelation 21 3 and 4"
//   "verse 17"  (continues the previous book and chapter)
//   "chapter 5" (continues the previous book)
//
// Two modes:
//   'speech' - careful mode used for live transcripts. Only full book names (and known mishearings)
//              count, and books whose names are ordinary words need the word "chapter" before a
//              chapter-only mention is accepted.
//   'typed'  - relaxed mode for things the user types by hand. Short abbreviations such as
//              "Ps 83:18" or "1Co 13:4" also work.

import { BOOKS, chapterCount, verseCount, isSingleChapter } from './books.js'
import { replaceNumberWords, isNumberToken } from './numbers.js'

const CHAPTER_WORDS = new Set(['chapter', 'chapters', 'ch', 'chap'])
const VERSE_WORDS = new Set(['verse', 'verses', 'v', 'vs', 'vv', 'ver', 'vers'])
const RANGE_WORDS = new Set(['-', 'to', 'through', 'thru', 'till', 'until'])
const LIST_WORDS = new Set(['and', '&', 'plus'])
// Words people put between "verse" and the number: "verse number 14", "chapter no 3".
const FILLER_WORDS = new Set(['number', 'numbers', 'no'])
// Continuations ("verse 17" on its own) only trigger on the full words in speech mode.
const CONTINUATION_CHAPTER_WORDS = new Set(['chapter', 'chapters'])
const CONTINUATION_VERSE_WORDS = new Set(['verse', 'verses'])

// The verse counts in books.js follow the traditional numbering. A translation can differ by a
// verse or two in a handful of chapters, so a verse slightly past the end is still accepted.
const VERSE_TOLERANCE = 2

const ORDINAL_PREFIXES = {
  1: ['1st', 'first', '1', 'i'],
  2: ['2nd', 'second', '2', 'ii'],
  3: ['3rd', 'third', '3', 'iii'],
}

// ---------------------------------------------------------------------------
// Text normalization
// ---------------------------------------------------------------------------

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function normalizeText(text) {
  let s = String(text || '').toLowerCase()
  s = s.replace(/[’‘`]/g, "'")
  s = s.replace(/'s\b/g, 's') // "corinthian's" -> "corinthians", "peter's" -> "peters"
  s = s.replace(/'/g, '')
  s = s.replace(/[–—]/g, '-')
  // "3:16" or "3.16" -> "3 : 16"
  s = s.replace(/(\d)\s*[:.]\s*(\d)/g, '$1 : $2')
  // hyphens between words are just spaces ("twenty-one"); hyphens between digits are ranges ("16-18")
  s = s.replace(/(?<!\d)-|-(?!\d)/g, ' ')
  s = s.replace(/(\d)-(\d)/g, '$1 - $2')
  // "ps83" -> "ps 83", "1co" -> "1 co", but keep "1st", "2nd", "3rd", "4th"
  s = s.replace(/([a-z])(\d)/g, '$1 $2')
  s = s.replace(/(\d)(?!(?:st|nd|rd|th)(?![a-z]))([a-z])/g, '$1 $2')
  // everything else that is not a letter, digit, colon or dash becomes a space
  s = s.replace(/[^a-z0-9:\-\s]/g, ' ')
  return s.replace(/\s+/g, ' ').trim()
}

export function tokenize(text) {
  const norm = normalizeText(text)
  if (!norm) return []
  return replaceNumberWords(norm.split(' '))
}

// ---------------------------------------------------------------------------
// Book name matching
// ---------------------------------------------------------------------------

function aliasesFor(book, mode) {
  const names = mode === 'typed' ? [...book.spoken, ...book.typed] : [...book.spoken]
  const unique = [...new Set(names)]
  if (!book.ordinal) return unique
  const prefixes = ORDINAL_PREFIXES[book.ordinal]
  const out = []
  for (const p of prefixes) for (const n of unique) out.push(`${p} ${n}`)
  return out
}

function aliasToPattern(alias) {
  // Every space in an alias may be zero or more spaces in the text ("1john" or "1 john").
  return alias.split(' ').map(escapeRegex).join('\\s*')
}

const matcherCache = new Map()

function bookMatcher(mode) {
  if (matcherCache.has(mode)) return matcherCache.get(mode)
  const groups = BOOKS.map((book) => {
    const aliases = aliasesFor(book, mode).sort((a, b) => b.length - a.length)
    return `(?<b${book.number}>${aliases.map(aliasToPattern).join('|')})`
  })
  const regex = new RegExp(`(?<![a-z0-9])(?:${groups.join('|')})(?![a-z])`, 'g')
  matcherCache.set(mode, regex)
  return regex
}

function findBookMatches(tokens, mode) {
  const joined = tokens.join(' ')
  const regex = bookMatcher(mode)
  regex.lastIndex = 0
  const matches = []
  for (const m of joined.matchAll(regex)) {
    const groupName = Object.keys(m.groups).find((k) => m.groups[k] !== undefined)
    const number = Number(groupName.slice(1))
    const book = BOOKS[number - 1]
    const start = countSpaces(joined, 0, m.index)
    const end = countSpaces(joined, 0, m.index + m[0].length) + 1
    // "verse numbers 14 and 15" is about verses, not the book of Numbers
    const previous = tokens[start - 1]
    if (book.number === 4 && (VERSE_WORDS.has(previous) || CHAPTER_WORDS.has(previous))) continue
    matches.push({ book, start, end })
  }
  return matches
}

// Skips "number" / "numbers" in "verse number 14" so the number comes next.
function skipFiller(tokens, i) {
  return FILLER_WORDS.has(tokens[i]) ? i + 1 : i
}

function countSpaces(s, from, to) {
  let n = 0
  for (let i = from; i < to; i++) if (s[i] === ' ') n++
  return n
}

// ---------------------------------------------------------------------------
// Reference objects
// ---------------------------------------------------------------------------

// Watch Tower style: two verses in a row are written "14, 15", three or more as "14-16".
function segmentsToString(segments) {
  return segments
    .map((s) => {
      if (s.from === s.to) return `${s.from}`
      if (s.to === s.from + 1) return `${s.from}, ${s.to}`
      return `${s.from}-${s.to}`
    })
    .join(', ')
}

export function makeReference(book, chapter, segments, extra = {}) {
  const chapterOnly = !segments || segments.length === 0
  const segs = chapterOnly ? [] : segments.map((s) => ({ from: s.from, to: s.to }))
  const segText = segmentsToString(segs)
  let label
  if (chapterOnly) label = isSingleChapter(book) ? book.name : `${book.name} ${chapter}`
  else label = isSingleChapter(book) ? `${book.name} ${segText}` : `${book.name} ${chapter}:${segText}`
  const key = chapterOnly ? `${book.number}:${chapter}` : `${book.number}:${chapter}:${segs.map((s) => (s.from === s.to ? s.from : `${s.from}-${s.to}`)).join(',')}`
  return {
    bookNumber: book.number,
    bookName: book.name,
    bookAbbr: book.abbr,
    chapter,
    segments: segs,
    verse: chapterOnly ? null : segs[0].from,
    verseEnd: chapterOnly ? null : segs[0].to,
    chapterOnly,
    explicitChapter: false,
    source: 'book',
    alternatives: [],
    tokenStart: 0,
    tokenEnd: 0,
    label,
    key,
    ...extra,
  }
}

function verseIsPlausible(book, chapter, verse) {
  return verse >= 1 && verse <= verseCount(book, chapter) + VERSE_TOLERANCE
}

function cleanSegments(book, chapter, segments) {
  const out = []
  for (const seg of segments) {
    if (!verseIsPlausible(book, chapter, seg.from)) break
    let to = seg.to
    if (to < seg.from || !verseIsPlausible(book, chapter, to)) to = seg.from
    const last = out[out.length - 1]
    if (last && seg.from <= last.to + 1) {
      // "14 and 15" or "14 to 16 and 17" become one continuous range
      last.to = Math.max(last.to, to)
    } else {
      out.push({ from: seg.from, to })
    }
  }
  return out
}

// ---------------------------------------------------------------------------
// Parsing the numbers that follow a book name
// ---------------------------------------------------------------------------

// Reads "16", "16 to 18", "16 and 17", "16, 17, 20", "16 17" (consecutive) starting at tokens[i].
function readVerseList(tokens, i, stopAt) {
  const segments = []
  let current = { from: Number(tokens[i]), to: Number(tokens[i]) }
  i++
  for (;;) {
    const t = tokens[i]
    if (RANGE_WORDS.has(t) && isNumberToken(tokens[i + 1]) && !stopAt.has(i + 1)) {
      current.to = Number(tokens[i + 1])
      i += 2
      continue
    }
    if (LIST_WORDS.has(t)) {
      let j = i + 1
      if (VERSE_WORDS.has(tokens[j])) j = skipFiller(tokens, j + 1)
      if (isNumberToken(tokens[j]) && !stopAt.has(j)) {
        segments.push(current)
        current = { from: Number(tokens[j]), to: Number(tokens[j]) }
        i = j + 1
        continue
      }
    }
    if (isNumberToken(t) && !stopAt.has(i) && Number(t) === current.to + 1) {
      // "verses 16 17" said without a joining word
      current.to = Number(t)
      i++
      continue
    }
    break
  }
  segments.push(current)
  return { segments, end: i }
}

// Splits a glued number such as "316" into chapter and verse candidates ("3:16").
function gluedCandidates(book, numberText) {
  const results = []
  for (let k = 1; k < numberText.length; k++) {
    const chapterText = numberText.slice(0, k)
    const verseText = numberText.slice(k)
    if (verseText[0] === '0') continue
    const chapter = Number(chapterText)
    const verse = Number(verseText)
    if (chapter < 1 || chapter > chapterCount(book)) continue
    if (!verseIsPlausible(book, chapter, verse)) continue
    results.push({ chapter, verse, chapterDigits: k })
  }
  // Prefer the split whose chapter part is one digit shorter than the verse part, which is how
  // recognizers usually glue "one twenty-one" (1:21) or "twenty-four fourteen" (24:14).
  const preferred = numberText.length <= 3 ? 1 : 2
  results.sort((a, b) => Math.abs(a.chapterDigits - preferred) - Math.abs(b.chapterDigits - preferred))
  return results
}

function parseAfterBook(tokens, start, book, mode, bookStarts) {
  let i = start
  let explicitChapter = false
  let explicitVerse = false

  if (tokens[i] === ':') i++
  if (CHAPTER_WORDS.has(tokens[i])) {
    explicitChapter = true
    i = skipFiller(tokens, i + 1)
  }

  const single = isSingleChapter(book)

  // Single-chapter books such as Jude: "Jude 3", "Jude verse 3", "Jude 1 3", "Jude 1:3".
  if (single) {
    let chapter = 1
    if (VERSE_WORDS.has(tokens[i])) {
      explicitVerse = true
      i = skipFiller(tokens, i + 1)
    }
    if (!isNumberToken(tokens[i]) || bookStarts.has(i)) {
      if (explicitChapter && !explicitVerse) return finish(makeReference(book, 1, [], { explicitChapter }), i)
      return null
    }
    // "Jude 1 verse 3" / "Jude 1 : 3" / "Jude 1 3"
    if (!explicitVerse && Number(tokens[i]) === 1) {
      let j = i + 1
      let sep = false
      if (tokens[j] === ':') {
        sep = true
        j++
      } else if (VERSE_WORDS.has(tokens[j])) {
        sep = true
        j = skipFiller(tokens, j + 1)
      }
      if (isNumberToken(tokens[j]) && !bookStarts.has(j) && (sep || verseIsPlausible(book, 1, Number(tokens[j])))) {
        const { segments, end } = readVerseList(tokens, j, bookStarts)
        const segs = cleanSegments(book, 1, segments)
        if (segs.length) return finish(makeReference(book, 1, segs, { explicitChapter: true }), end)
      }
      if (explicitChapter) return finish(makeReference(book, 1, [], { explicitChapter }), i + 1)
    }
    const { segments, end } = readVerseList(tokens, i, bookStarts)
    const segs = cleanSegments(book, chapter, segments)
    if (!segs.length) return null
    return finish(makeReference(book, chapter, segs, { explicitChapter }), end)
  }

  if (!isNumberToken(tokens[i]) || bookStarts.has(i)) return null
  const chapterText = tokens[i]
  const chapter = Number(chapterText)
  i++

  // Verse part
  let separator = false
  if (tokens[i] === ':') {
    separator = true
    i++
  } else if (VERSE_WORDS.has(tokens[i])) {
    separator = true
    explicitVerse = true
    i = skipFiller(tokens, i + 1)
  }

  const chapterValid = chapter >= 1 && chapter <= chapterCount(book)

  let segments = []
  let end = i
  if (isNumberToken(tokens[i]) && !bookStarts.has(i)) {
    const firstVerse = Number(tokens[i])
    // Without a separator the number only counts as a verse when it is believable for that chapter.
    if (separator || (chapterValid && verseIsPlausible(book, chapter, firstVerse))) {
      const read = readVerseList(tokens, i, bookStarts)
      segments = read.segments
      end = read.end
    }
  }

  if (chapterValid) {
    const segs = cleanSegments(book, chapter, segments)
    if (segs.length) return finish(makeReference(book, chapter, segs, { explicitChapter, explicitVerse }), end)
    if (separator && explicitVerse) return null // "John 3 verse 999" makes no sense
    // Chapter only. Also offer glued splits as alternatives for numbers like "119".
    const ref = makeReference(book, chapter, [], { explicitChapter })
    if (chapterText.length >= 3 && !separator) {
      ref.alternatives = gluedCandidates(book, chapterText).map((c) => makeReference(book, c.chapter, [{ from: c.verse, to: c.verse }]))
    }
    // "Mark 3" or "Matthew 24" without the word "chapter" could be ordinary talk, so it is not
    // reported on its own. It is still remembered, so that a following "verse 14" makes sense.
    if (mode === 'speech' && book.cautious && !explicitChapter) ref.tentative = true
    return finish(ref, separator ? i - 1 : i)
  }

  // Chapter number is impossible for this book. Maybe chapter and verse were glued together ("316").
  if (chapterText.length >= 3 && segments.length === 0) {
    const candidates = gluedCandidates(book, chapterText)
    if (!candidates.length) return null
    const [best, ...rest] = candidates
    const ref = makeReference(book, best.chapter, [{ from: best.verse, to: best.verse }], { explicitChapter })
    ref.alternatives = rest.map((c) => makeReference(book, c.chapter, [{ from: c.verse, to: c.verse }]))
    return finish(ref, i)
  }
  return null

  function finish(ref, endIndex) {
    ref.tokenStart = start
    ref.tokenEnd = endIndex
    return ref
  }
}

// "verse 17", "verses 3 to 5", "chapter 4", "chapter 4 verse 2" without a book name.
function parseContinuation(tokens, i, context, bookStarts) {
  if (!context) return null
  const book = BOOKS[context.bookNumber - 1]
  if (!book) return null
  let chapter = context.chapter || 1
  let explicitChapter = false
  let j = i
  if (CONTINUATION_CHAPTER_WORDS.has(tokens[j])) {
    const n = skipFiller(tokens, j + 1)
    if (!isNumberToken(tokens[n]) || bookStarts.has(n)) return null
    chapter = Number(tokens[n])
    if (chapter < 1 || chapter > chapterCount(book)) return null
    explicitChapter = true
    j = n + 1
    if (tokens[j] === ':') j++
    if (!VERSE_WORDS.has(tokens[j]) && !isNumberToken(tokens[j])) {
      return withSpan(makeReference(book, chapter, [], { explicitChapter, source: 'continuation' }), i, j)
    }
  }
  if (VERSE_WORDS.has(tokens[j])) j = skipFiller(tokens, j + 1)
  else if (!explicitChapter) return null
  if (!isNumberToken(tokens[j]) || bookStarts.has(j)) {
    if (explicitChapter) return withSpan(makeReference(book, chapter, [], { explicitChapter, source: 'continuation' }), i, j)
    return null
  }
  const { segments, end } = readVerseList(tokens, j, bookStarts)
  const segs = cleanSegments(book, chapter, segments)
  if (!segs.length) {
    if (explicitChapter) return withSpan(makeReference(book, chapter, [], { explicitChapter, source: 'continuation' }), i, j)
    return null
  }
  return withSpan(makeReference(book, chapter, segs, { explicitChapter, source: 'continuation' }), i, end)

  function withSpan(ref, s, e) {
    ref.tokenStart = s
    ref.tokenEnd = e
    return ref
  }
}

// ---------------------------------------------------------------------------
// Public entry point
// ---------------------------------------------------------------------------

/**
 * Find every Bible reference in a piece of text.
 *
 * @param {string} text            The text to search.
 * @param {object} options
 * @param {'speech'|'typed'} options.mode   How strict to be (see the top of this file).
 * @param {{bookNumber:number, chapter:number}|null} options.context
 *        The most recent reference, used to understand "verse 17" said on its own.
 * @returns {{refs: Array, context: object|null}}
 *        The references in the order they appear, and the context to remember for the next
 *        piece of text (the last book and chapter that was mentioned, even a held-back one).
 */
export function analyzeText(text, { mode = 'speech', context = null } = {}) {
  const tokens = tokenize(text)
  if (!tokens.length) return { refs: [], context }

  const bookMatches = findBookMatches(tokens, mode)
  const bookStarts = new Set(bookMatches.map((m) => m.start))

  const anchors = bookMatches.map((m) => ({ index: m.start, match: m }))
  const contWords = new Set([...CONTINUATION_CHAPTER_WORDS, ...CONTINUATION_VERSE_WORDS])
  tokens.forEach((t, idx) => {
    if (contWords.has(t)) anchors.push({ index: idx, match: null })
  })
  anchors.sort((a, b) => a.index - b.index)

  const refs = []
  let currentContext = context
  let consumedUntil = -1

  for (const anchor of anchors) {
    if (anchor.index < consumedUntil) continue
    let ref
    if (anchor.match) {
      ref = parseAfterBook(tokens, anchor.match.end, anchor.match.book, mode, bookStarts)
      if (ref) ref.tokenStart = anchor.match.start
    } else {
      ref = parseContinuation(tokens, anchor.index, currentContext, bookStarts)
    }
    if (!ref) continue
    consumedUntil = ref.tokenEnd
    currentContext = { bookNumber: ref.bookNumber, chapter: ref.chapter }
    if (!ref.tentative) refs.push(ref)
  }
  return { refs, context: currentContext }
}

/** Like analyzeText, but returns only the list of references. */
export function findReferences(text, options) {
  return analyzeText(text, options).refs
}

/** Parse a single reference the user typed by hand. Returns the first match or null. */
export function parseTyped(text, context = null) {
  const refs = findReferences(text, { mode: 'typed', context })
  return refs[0] || null
}
