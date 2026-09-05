// Builds the web addresses that open a scripture on jw.org, in the Watchtower Online Library,
// or in the JW Library app.
//
// All three use the same "bible" code: two digits for the book, three for the chapter and
// three for the verse. John 3:16 is book 43, chapter 3, verse 16, so its code is 43003016.
// A range of verses is written as "43003016-43003018".

export const OPEN_MODES = [
  {
    id: 'wol',
    label: 'Watchtower Online Library (wol.jw.org)',
    hint: 'Opens the chapter in a separate browser window and jumps to the verse. Best choice on a laptop.',
  },
  {
    id: 'jworg',
    label: 'jw.org',
    hint: 'Opens the jw.org "finder" link. On a phone or tablet this can hand the verse over to the JW Library app.',
  },
  {
    id: 'jwlibrary',
    label: 'JW Library app on this computer',
    hint: 'Uses the jwlibrary:// link. The JW Library app must be installed on this device.',
  },
  {
    id: 'embed',
    label: 'Inside this page (split view)',
    hint: 'Shows the Watchtower Online Library inside this page. If the panel stays blank, the site does not allow this and you should pick another option.',
  },
]

// Presets for the most common languages. "code" is the jw.org language code (wtlocale),
// "wol" is the language part of Watchtower Online Library addresses, "pub" is the Bible edition
// code and "speech" is the language sent to the speech recognizer.
export const LANGUAGE_PRESETS = [
  { code: 'E', label: 'English', wol: 'en', pub: 'nwtsty', speech: 'en-US' },
  { code: 'S', label: 'Spanish (Español)', wol: 'es', pub: 'nwtsty', speech: 'es-ES' },
  { code: 'F', label: 'French (Français)', wol: 'fr', pub: 'nwtsty', speech: 'fr-FR' },
  { code: 'X', label: 'German (Deutsch)', wol: 'de', pub: 'nwtsty', speech: 'de-DE' },
  { code: 'I', label: 'Italian (Italiano)', wol: 'it', pub: 'nwtsty', speech: 'it-IT' },
  { code: 'T', label: 'Portuguese (Português, Brazil)', wol: 'pt', pub: 'nwtsty', speech: 'pt-BR' },
  { code: 'P', label: 'Polish (Polski)', wol: 'pl', pub: 'nwtsty', speech: 'pl-PL' },
  { code: 'U', label: 'Russian (Русский)', wol: 'ru', pub: 'nwtsty', speech: 'ru-RU' },
  { code: 'K', label: 'Ukrainian (Українська)', wol: 'uk', pub: 'nwt', speech: 'uk-UA' },
  { code: 'O', label: 'Dutch (Nederlands)', wol: 'nl', pub: 'nwt', speech: 'nl-NL' },
]

export const SPEECH_LANGUAGES = [
  { code: 'en-US', label: 'English (United States)' },
  { code: 'en-GB', label: 'English (United Kingdom)' },
  { code: 'en-AU', label: 'English (Australia)' },
  { code: 'en-CA', label: 'English (Canada)' },
  { code: 'en-IN', label: 'English (India)' },
  { code: 'en-NZ', label: 'English (New Zealand)' },
  { code: 'en-ZA', label: 'English (South Africa)' },
]

export const DEFAULT_SETTINGS = {
  openMode: 'wol',
  wtlocale: 'E',
  wolLang: 'en',
  pub: 'nwtsty',
  speechLang: 'en-US',
  autoOpen: true,
  openChapterOnly: true,
  fastMode: true,
}

function pad(n, width) {
  return String(n).padStart(width, '0')
}

export function bibleCode(ref) {
  const from = ref.chapterOnly ? 1 : ref.verse
  const to = ref.chapterOnly ? 1 : ref.verseEnd
  const start = `${pad(ref.bookNumber, 2)}${pad(ref.chapter, 3)}${pad(from, 3)}`
  if (to && to !== from) return `${start}-${pad(ref.bookNumber, 2)}${pad(ref.chapter, 3)}${pad(to, 3)}`
  return start
}

function finderQuery(ref, settings) {
  const params = new URLSearchParams()
  params.set('wtlocale', settings.wtlocale || 'E')
  params.set('prefer', 'lang')
  params.set('bible', bibleCode(ref))
  if (settings.pub) params.set('pub', settings.pub)
  return params.toString()
}

export function wolUrl(ref, settings) {
  const lang = settings.wolLang || 'en'
  const locale = (settings.wtlocale || 'E').toLowerCase()
  const pub = settings.pub || 'nwtsty'
  let url = `https://wol.jw.org/${lang}/wol/b/r1/lp-${locale}/${pub}/${ref.bookNumber}/${ref.chapter}`
  if (!ref.chapterOnly) url += `#v=${ref.bookNumber}:${ref.chapter}:${ref.verse}`
  return url
}

export function jwOrgUrl(ref, settings) {
  return `https://www.jw.org/finder?${finderQuery(ref, settings)}`
}

export function jwLibraryUrl(ref, settings) {
  return `jwlibrary:///finder?${finderQuery(ref, settings)}`
}

export function buildUrl(ref, settings) {
  switch (settings.openMode) {
    case 'jworg':
      return jwOrgUrl(ref, settings)
    case 'jwlibrary':
      return jwLibraryUrl(ref, settings)
    case 'embed':
    case 'wol':
    default:
      return wolUrl(ref, settings)
  }
}

/** A harmless page to open when the Bible window is first created (before any scripture is known). */
export function homeUrl(settings) {
  if (settings.openMode === 'jworg') return 'https://www.jw.org/'
  return `https://wol.jw.org/${settings.wolLang || 'en'}/`
}
