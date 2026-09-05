import { describe, it, expect } from 'vitest'
import { analyzeText, findReferences, parseTyped, tokenize } from './parser.js'
import { replaceNumberWords } from './numbers.js'
import { BOOKS } from './books.js'
import { bibleCode, wolUrl, jwOrgUrl, jwLibraryUrl, DEFAULT_SETTINGS } from './links.js'

const speech = (text, context = null) => findReferences(text, { mode: 'speech', context })
const labels = (text, context = null) => speech(text, context).map((r) => r.label)

describe('book data', () => {
  it('has the traditional 66 books, 1189 chapters and 31102 verses', () => {
    expect(BOOKS.length).toBe(66)
    const chapters = BOOKS.reduce((a, b) => a + b.verses.length, 0)
    const verses = BOOKS.reduce((a, b) => a + b.verses.reduce((x, y) => x + y, 0), 0)
    expect(chapters).toBe(1189)
    expect(verses).toBe(31102)
  })
  it('numbers the books in order', () => {
    BOOKS.forEach((b, i) => expect(b.number).toBe(i + 1))
  })
})

describe('number words', () => {
  const conv = (s) => replaceNumberWords(s.split(' ')).join(' ')
  it('keeps separate numbers separate', () => {
    expect(conv('three sixteen')).toBe('3 16')
    expect(conv('sixteen seventeen')).toBe('16 17')
    expect(conv('one twenty one')).toBe('1 21')
    expect(conv('twenty sixteen')).toBe('20 16')
  })
  it('joins tens and ones', () => {
    expect(conv('twenty one')).toBe('21')
    expect(conv('eighty three eighteen')).toBe('83 18')
  })
  it('handles hundreds', () => {
    expect(conv('one hundred nineteen')).toBe('119')
    expect(conv('one hundred and nineteen')).toBe('119')
    expect(conv('a hundred and nineteen')).toBe('119')
    expect(conv('hundred')).toBe('100')
    expect(conv('one hundred')).toBe('100')
  })
  it('leaves other words alone', () => {
    expect(conv('verses three and four')).toBe('verses 3 and 4')
    expect(conv('the first one')).toBe('the first 1')
  })
})

describe('tokenize', () => {
  it('splits colons, ranges and glued abbreviations', () => {
    expect(tokenize('John 3:16-18')).toEqual(['john', '3', ':', '16', '-', '18'])
    expect(tokenize('Ps83:18')).toEqual(['ps', '83', ':', '18'])
    expect(tokenize('1st John 4:8')).toEqual(['1st', 'john', '4', ':', '8'])
    expect(tokenize('twenty-one')).toEqual(['21'])
  })
})

describe('plain references', () => {
  it('parses colon form', () => {
    expect(labels('Please read John 3:16')).toEqual(['John 3:16'])
  })
  it('parses spoken digits', () => {
    expect(labels('Let us open to John 3 16')).toEqual(['John 3:16'])
  })
  it('parses spoken words', () => {
    expect(labels('John chapter three verse sixteen')).toEqual(['John 3:16'])
    expect(labels('Psalm eighty three eighteen')).toEqual(['Psalms 83:18'])
    expect(labels('Psalm one hundred nineteen verse one hundred and five')).toEqual(['Psalms 119:105'])
  })
  it('parses chapter and verse words', () => {
    expect(labels('Matthew chapter 24 verse 14')).toEqual(['Matthew 24:14'])
    expect(labels('Matthew chapter 24 verses 14 and 15')).toEqual(['Matthew 24:14, 15'])
    expect(labels('Matthew 24 verses 14 to 16')).toEqual(['Matthew 24:14-16'])
    expect(labels('Matthew 24 verses 14 through 16')).toEqual(['Matthew 24:14-16'])
    expect(labels('Matthew 24:14, 15')).toEqual(['Matthew 24:14, 15'])
    expect(labels('Matthew 24 verses 14 to 16 and 17')).toEqual(['Matthew 24:14-17'])
    expect(labels('Matthew 24 14 and 45')).toEqual(['Matthew 24:14, 45'])
  })
  it('parses numbered books', () => {
    expect(labels('First Corinthians 13 4 through 8')).toEqual(['1 Corinthians 13:4-8'])
    expect(labels('1st John 4:8')).toEqual(['1 John 4:8'])
    expect(labels('1 John 4 8')).toEqual(['1 John 4:8'])
    expect(labels('second Timothy 3 16 17')).toEqual(['2 Timothy 3:16, 17'])
    expect(labels('third John verse 4')).toEqual(['3 John 4'])
    expect(labels('2 Peter 3 13')).toEqual(['2 Peter 3:13'])
  })
  it('does not confuse John with 1 John', () => {
    expect(speech('1 John 4 8')[0].bookNumber).toBe(62)
    expect(speech('John 4 8')[0].bookNumber).toBe(43)
  })
  it('parses single chapter books', () => {
    expect(labels('Jude 3')).toEqual(['Jude 3'])
    expect(labels('Jude verse 3')).toEqual(['Jude 3'])
    expect(labels('Jude 1:3')).toEqual(['Jude 3'])
    expect(labels('Philemon verses 4 to 7')).toEqual(['Philemon 4-7'])
    expect(speech('Jude 3')[0].chapter).toBe(1)
  })
  it('handles common mishearings', () => {
    expect(labels('Philippines 4 6 7')).toEqual(['Philippians 4:6, 7'])
    expect(labels('Revelations 21 4')).toEqual(['Revelation 21:4'])
    expect(labels('Palm 83 18')).toEqual(['Psalms 83:18'])
    expect(labels("Corinthian's 13 4")).toEqual([])
  })
  it('finds several references in one sentence', () => {
    expect(labels('John 3 16 and 2 Timothy 3 16')).toEqual(['John 3:16', '2 Timothy 3:16'])
    expect(labels('Romans 5 12 then Psalm 37 29')).toEqual(['Romans 5:12', 'Psalms 37:29'])
  })
})

describe('the word "number" after chapter or verse', () => {
  it('understands "verse number" and "chapter number"', () => {
    expect(labels("let's open the book of Matthew chapter 24 verse number 14")).toEqual(['Matthew 24:14'])
    expect(labels("let's open the book of Matthew chapter twenty four verse number fourteen")).toEqual(['Matthew 24:14'])
    expect(labels('turn with me to the book of first Corinthians chapter number 13 verse number 4')).toEqual(['1 Corinthians 13:4'])
    expect(labels('Jude verse number 3')).toEqual(['Jude 3'])
    expect(labels('Matthew 24 verse 14 and verse number 15')).toEqual(['Matthew 24:14, 15'])
  })
  it('does not mistake "verse numbers" for the book of Numbers', () => {
    expect(labels("open your Bibles to Matthew 24 and let's read verse numbers 14 and 15")).toEqual(['Matthew 24:14, 15'])
    expect(labels('verse numbers 14 and 15', { bookNumber: 40, chapter: 24 })).toEqual(['Matthew 24:14, 15'])
    expect(labels('chapter number 5 verse number 3', { bookNumber: 40, chapter: 24 })).toEqual(['Matthew 5:3'])
    expect(labels('Numbers chapter 6 verse 24')).toEqual(['Numbers 6:24'])
  })
})

describe('glued numbers', () => {
  it('splits numbers that were run together', () => {
    expect(labels('John 316')).toEqual(['John 3:16'])
    expect(labels('Matthew 2414')).toEqual(['Matthew 24:14'])
    expect(labels('Psalm 8318')).toEqual(['Psalms 83:18'])
    expect(labels('Isaiah 4031')).toEqual(['Isaiah 40:31'])
  })
  it('offers alternatives when the split is unclear', () => {
    const [ref] = speech('Genesis 121')
    expect(ref.label).toBe('Genesis 1:21')
    expect(ref.alternatives.map((a) => a.label)).toEqual(['Genesis 12:1'])
  })
  it('keeps a real chapter number whole', () => {
    expect(labels('Psalm 119')).toEqual(['Psalms 119'])
    expect(labels('Psalm 100')).toEqual(['Psalms 100'])
  })
})

describe('chapter only references', () => {
  it('accepts chapter only for ordinary book names', () => {
    expect(labels('Turn to Psalm 83')).toEqual(['Psalms 83'])
    expect(labels('Revelation 21')).toEqual(['Revelation 21'])
  })
  it('requires the word chapter for names that are common words', () => {
    expect(labels('Mark 3')).toEqual([])
    expect(labels('Job 2')).toEqual([])
    expect(labels('John, one of the apostles')).toEqual([])
    expect(labels('Mark chapter 3')).toEqual(['Mark 3'])
    expect(labels('John chapter 3')).toEqual(['John 3'])
  })
  it('drops verse numbers that cannot exist and keeps the chapter', () => {
    expect(labels('Psalm 83 2025')).toEqual(['Psalms 83'])
    expect(labels('Psalm 83 verse 2025')).toEqual([])
  })
  it('rejects impossible chapters', () => {
    expect(labels('Jude 5 7')).toEqual(['Jude 5'])
    expect(labels('Jude verses 5 and 7')).toEqual(['Jude 5, 7'])
    expect(labels('Revelation 99 1')).toEqual([])
    expect(labels('Titus 12 3')).toEqual([])
  })
})

describe('continuations', () => {
  const ctx = { bookNumber: 43, chapter: 3 }
  it('understands a verse said on its own', () => {
    expect(labels('now look at verse 17', ctx)).toEqual(['John 3:17'])
    expect(labels('verses 19 and 20', ctx)).toEqual(['John 3:19, 20'])
  })
  it('understands a chapter said on its own', () => {
    expect(labels('then in chapter 5', ctx)).toEqual(['John 5'])
    expect(labels('chapter 5 verse 28', ctx)).toEqual(['John 5:28'])
  })
  it('uses references earlier in the same text as context', () => {
    expect(labels('John chapter 3 and now verse 16')).toEqual(['John 3', 'John 3:16'])
  })
  it('remembers a held-back mention such as "Matthew 24" for the next sentence', () => {
    const first = analyzeText('Please turn to Matthew 24')
    expect(first.refs).toEqual([])
    expect(first.context).toEqual({ bookNumber: 40, chapter: 24 })
    const second = analyzeText('verse 14 says', { context: first.context })
    expect(second.refs.map((r) => r.label)).toEqual(['Matthew 24:14'])
    expect(analyzeText('nothing here', { context: first.context }).context).toEqual(first.context)
  })
  it('does nothing without context', () => {
    expect(labels('verse 17')).toEqual([])
  })
  it('does not double count the verse word inside a reference', () => {
    expect(labels('John 3 verse 16', ctx)).toEqual(['John 3:16'])
  })
})

describe('typed mode', () => {
  it('accepts abbreviations', () => {
    expect(parseTyped('Ps 83:18').label).toBe('Psalms 83:18')
    expect(parseTyped('1Co 13:4-8').label).toBe('1 Corinthians 13:4-8')
    expect(parseTyped('Re 21:3, 4').label).toBe('Revelation 21:3, 4')
    expect(parseTyped('Mt 24:14').label).toBe('Matthew 24:14')
    expect(parseTyped('Joh 17:3').label).toBe('John 17:3')
    expect(parseTyped('mark 3').label).toBe('Mark 3')
  })
  it('returns null for nonsense', () => {
    expect(parseTyped('hello there')).toBeNull()
  })
})

describe('links', () => {
  const ref = parseTyped('John 3:16-18')
  it('builds the bible code', () => {
    expect(bibleCode(ref)).toBe('43003016-43003018')
    expect(bibleCode(parseTyped('Mt 24:14, 15'))).toBe('40024014-40024015')
    expect(parseTyped('Mt 24:14, 15').key).toBe('40:24:14-15')
    expect(bibleCode(parseTyped('Ps 83:18'))).toBe('19083018')
    expect(bibleCode(parseTyped('Ps 83'))).toBe('19083001')
  })
  it('builds urls', () => {
    expect(wolUrl(ref, DEFAULT_SETTINGS)).toBe('https://wol.jw.org/en/wol/b/r1/lp-e/nwtsty/43/3#v=43:3:16')
    expect(jwOrgUrl(ref, DEFAULT_SETTINGS)).toBe('https://www.jw.org/finder?wtlocale=E&prefer=lang&bible=43003016-43003018&pub=nwtsty')
    expect(jwLibraryUrl(ref, DEFAULT_SETTINGS)).toBe('jwlibrary:///finder?wtlocale=E&prefer=lang&bible=43003016-43003018&pub=nwtsty')
  })
  it('respects language settings', () => {
    const s = { ...DEFAULT_SETTINGS, wtlocale: 'K', wolLang: 'uk', pub: 'nwt' }
    expect(wolUrl(parseTyped('Ps 83'), s)).toBe('https://wol.jw.org/uk/wol/b/r1/lp-k/nwt/19/83')
    expect(jwOrgUrl(parseTyped('Ps 83'), s)).toBe('https://www.jw.org/finder?wtlocale=K&prefer=lang&bible=19083001&pub=nwt')
  })
})
