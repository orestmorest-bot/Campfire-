import { useCallback, useEffect, useRef, useState } from 'react'
import { analyzeText, findReferences, parseTyped } from './lib/parser.js'
import { buildUrl, homeUrl, DEFAULT_SETTINGS } from './lib/links.js'
import { useSpeechRecognition } from './hooks/useSpeechRecognition.js'
import { useMicLevel } from './hooks/useMicLevel.js'
import { useWakeLock } from './hooks/useWakeLock.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import CurrentScripture from './components/CurrentScripture.jsx'
import HistoryList from './components/HistoryList.jsx'
import TranscriptPanel from './components/TranscriptPanel.jsx'
import ManualEntry from './components/ManualEntry.jsx'
import SettingsPanel from './components/SettingsPanel.jsx'

// The Bible always opens in one browser window with this name, so every new scripture
// replaces the previous one instead of piling up tabs.
const WINDOW_NAME = 'jw-scripture-window'
// How long a scripture heard in live (not yet final) speech must stay unchanged before we open it.
const INTERIM_DELAY_MS = 900
// The same scripture heard again within this time is not opened a second time.
const DEDUPE_MS = 30000

let idCounter = 0
const uid = () => `${Date.now()}-${idCounter++}`

export default function App() {
  const [settings, setSettings] = useLocalStorage('scripture-opener-settings', DEFAULT_SETTINGS)
  const [segments, setSegments] = useState([]) // finished lines of the transcript
  const [interimText, setInterimText] = useState('') // words still being recognized
  const [history, setHistory] = useState([])
  const [current, setCurrent] = useState(null)
  const [popupBlocked, setPopupBlocked] = useState(false)
  const [embedUrl, setEmbedUrl] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [notice, setNotice] = useState('')

  const settingsRef = useRef(settings)
  const contextRef = useRef(null) // last book and chapter, for "verse 17" said on its own
  const recentKeys = useRef(new Map())
  const interimTimer = useRef(null)
  const pendingInterimKey = useRef(null)
  const bibleWindow = useRef(null)

  useEffect(() => {
    settingsRef.current = settings
  }, [settings])

  const clearInterimTimer = () => {
    if (interimTimer.current) {
      clearTimeout(interimTimer.current)
      interimTimer.current = null
    }
    pendingInterimKey.current = null
  }

  // Opens one scripture using the chosen method. Returns true when it worked.
  const openReference = useCallback((ref) => {
    const s = settingsRef.current
    const url = buildUrl(ref, s)
    if (s.openMode === 'embed') {
      setEmbedUrl(url)
      return true
    }
    if (s.openMode === 'jwlibrary') {
      window.location.href = url
      return true
    }
    let win
    try {
      win = window.open(url, WINDOW_NAME)
    } catch {
      win = null
    }
    if (!win) {
      setPopupBlocked(true)
      return false
    }
    bibleWindow.current = win
    setPopupBlocked(false)
    return true
  }, [])

  // Called for every scripture we detect (from speech or typed by hand).
  const processReference = useCallback(
    (ref, source) => {
      const now = Date.now()
      contextRef.current = { bookNumber: ref.bookNumber, chapter: ref.chapter }
      const seenAt = recentKeys.current.get(ref.key)
      if (source !== 'manual' && seenAt && now - seenAt < DEDUPE_MS) return
      recentKeys.current.set(ref.key, now)

      const s = settingsRef.current
      const shouldOpen = source === 'manual' || (s.autoOpen && (!ref.chapterOnly || s.openChapterOnly))
      const opened = shouldOpen ? openReference(ref) : false
      const item = { id: uid(), ref, time: now, source, opened }
      setHistory((h) => [item, ...h].slice(0, 100))
      setCurrent(item)
    },
    [openReference],
  )

  const handleResult = useCallback(
    ({ finals, interim }) => {
      for (const text of finals) {
        clearInterimTimer()
        const { refs, context } = analyzeText(text, { mode: 'speech', context: contextRef.current })
        // Remember the last book and chapter, even a held-back one such as "Matthew 24",
        // so that a "verse 14" in the next sentence is understood.
        contextRef.current = context
        setSegments((prev) => [...prev.slice(-80), { id: uid(), text, refs }])
        refs.forEach((ref) => processReference(ref, 'speech'))
      }
      setInterimText(interim)
      if (interim && settingsRef.current.fastMode) {
        const refs = findReferences(interim, { mode: 'speech', context: contextRef.current })
        const complete = refs.filter((r) => !r.chapterOnly)
        const last = complete[complete.length - 1]
        if (last && pendingInterimKey.current !== last.key) {
          clearInterimTimer()
          pendingInterimKey.current = last.key
          interimTimer.current = setTimeout(() => {
            pendingInterimKey.current = null
            interimTimer.current = null
            processReference(last, 'speech')
          }, INTERIM_DELAY_MS)
        }
      }
    },
    [processReference],
  )

  const { supported, state, errorMessage, start, stop } = useSpeechRecognition({
    lang: settings.speechLang,
    onResult: handleResult,
  })
  const listening = state === 'listening' || state === 'starting'
  useWakeLock(listening)
  const { level, micError } = useMicLevel(listening)

  useEffect(() => () => clearInterimTimer(), [])

  // Creates the Bible window while we still have the user's click, so the browser does not
  // treat later automatic openings as unwanted pop-ups.
  const ensureBibleWindow = useCallback(() => {
    const s = settingsRef.current
    if (s.openMode !== 'wol' && s.openMode !== 'jworg') return
    if (bibleWindow.current && !bibleWindow.current.closed) return
    const url = current ? buildUrl(current.ref, s) : homeUrl(s)
    let win
    try {
      win = window.open(url, WINDOW_NAME)
    } catch {
      win = null
    }
    if (win) {
      bibleWindow.current = win
      setPopupBlocked(false)
    } else {
      setPopupBlocked(true)
    }
  }, [current])

  const handleStart = () => {
    setNotice('')
    ensureBibleWindow()
    start()
  }

  const handleStop = () => {
    clearInterimTimer()
    setInterimText('')
    stop()
  }

  const handleManual = (text) => {
    const ref = parseTyped(text, contextRef.current)
    if (!ref) {
      setNotice(`Sorry, "${text}" does not look like a scripture. Try something like "Ps 83:18" or "1 Cor 13:4".`)
      return false
    }
    setNotice('')
    processReference(ref, 'manual')
    return true
  }

  const handleOpenAgain = (item) => {
    const opened = openReference(item.ref)
    setHistory((h) => h.map((x) => (x.id === item.id ? { ...x, opened: x.opened || opened } : x)))
    setCurrent({ ...item, opened: item.opened || opened })
  }

  const handleClear = () => {
    setSegments([])
    setHistory([])
    setCurrent(null)
    setInterimText('')
    recentKeys.current.clear()
    contextRef.current = null
  }

  const statusLabel = {
    idle: 'Not listening',
    starting: 'Starting…',
    listening: 'Listening',
    error: 'Problem',
  }[state]

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            📖
          </span>
          <div>
            <h1>Scripture Opener</h1>
            <p className="tagline">Hears the scripture, opens it for you.</p>
          </div>
        </div>

        <div className="controls">
          <div className={`status status-${state}`} role="status">
            <span className="status-dot" />
            <span>{statusLabel}</span>
            {listening && (
              <span className="mic-meter" title="Microphone level" aria-hidden="true">
                <span className="mic-meter-fill" style={{ width: `${Math.round(level * 100)}%` }} />
              </span>
            )}
          </div>
          {listening ? (
            <button type="button" className="btn btn-stop" onClick={handleStop}>
              Stop listening
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={handleStart} disabled={!supported}>
              Start listening
            </button>
          )}
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setShowSettings((v) => !v)}
            aria-expanded={showSettings}
          >
            {showSettings ? 'Close settings' : 'Settings'}
          </button>
        </div>
      </header>

      {!supported && (
        <div className="banner banner-error">
          This browser cannot do speech recognition. Please open this page in Google Chrome or Microsoft Edge on a
          computer, or Chrome on Android.
        </div>
      )}
      {errorMessage && <div className="banner banner-error">{errorMessage}</div>}
      {micError && !errorMessage && <div className="banner banner-warn">Microphone: {micError}</div>}
      {popupBlocked && (
        <div className="banner banner-warn">
          <span>
            The browser blocked the Bible window. Click the button to open it, and allow pop-ups for this page (the
            icon at the right end of the address bar) so it can open by itself next time.
          </span>
          <button type="button" className="btn btn-small" onClick={() => (current ? handleOpenAgain(current) : ensureBibleWindow())}>
            Open Bible window
          </button>
        </div>
      )}
      {notice && <div className="banner banner-info">{notice}</div>}

      {showSettings && (
        <SettingsPanel
          settings={settings}
          onChange={setSettings}
          onReset={() => setSettings(DEFAULT_SETTINGS)}
          onTest={() => handleManual('John 3:16')}
        />
      )}

      <main className={`layout ${settings.openMode === 'embed' ? 'layout-embed' : ''}`}>
        <section className="column column-left">
          <CurrentScripture
            item={current}
            listening={listening}
            onOpen={handleOpenAgain}
            onPickAlternative={(alt) => processReference(alt, 'manual')}
          />
          <ManualEntry onSubmit={handleManual} />
          <HistoryList items={history} onOpen={handleOpenAgain} onClear={handleClear} />
        </section>

        <section className="column column-right">
          {settings.openMode === 'embed' ? (
            <div className="embed">
              {embedUrl ? (
                <iframe title="Bible" src={embedUrl} className="embed-frame" />
              ) : (
                <div className="embed-empty">The scripture will appear here once one is mentioned.</div>
              )}
              <TranscriptPanel segments={segments} interimText={interimText} listening={listening} compact />
            </div>
          ) : (
            <TranscriptPanel segments={segments} interimText={interimText} listening={listening} />
          )}
        </section>
      </main>

      <footer className="foot">
        <p>
          Tip: put this window and the Bible window side by side. Speech recognition needs an internet connection and
          works best in Google Chrome or Microsoft Edge.
        </p>
      </footer>
    </div>
  )
}
