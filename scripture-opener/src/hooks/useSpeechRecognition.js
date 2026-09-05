import { useCallback, useEffect, useRef, useState } from 'react'

// Wraps the browser's built-in speech recognition (the Web Speech API) so that it keeps
// listening for as long as we want it to. Chrome stops a recognition session on its own after
// a while (silence, a network hiccup, or simply a time limit), so we start it again whenever it
// ends while we still want to listen.

export function getSpeechRecognitionClass() {
  if (typeof window === 'undefined') return null
  return window.SpeechRecognition || window.webkitSpeechRecognition || null
}

const ERROR_MESSAGES = {
  'not-allowed':
    'Microphone access was refused. Click the lock icon in the address bar, allow the microphone, then start again.',
  'service-not-allowed':
    'This browser does not allow the speech service here. Try Google Chrome or Microsoft Edge on a computer.',
  'audio-capture': 'No microphone was found. Plug one in or pick one in the browser settings, then start again.',
  network: 'The speech service could not be reached. Check the internet connection. Listening will keep retrying.',
  'language-not-supported': 'The speech service does not support the chosen speech language.',
}

export function useSpeechRecognition({ lang, onResult, onError }) {
  const supported = getSpeechRecognitionClass() !== null
  const [state, setState] = useState('idle') // 'idle' | 'starting' | 'listening' | 'error'
  const [errorMessage, setErrorMessage] = useState('')
  const [restartCount, setRestartCount] = useState(0)

  const wantListening = useRef(false)
  const recognition = useRef(null)
  const restartTimer = useRef(null)
  const restartDelay = useRef(250)
  const onResultRef = useRef(onResult)
  const onErrorRef = useRef(onError)
  const langRef = useRef(lang)

  useEffect(() => {
    onResultRef.current = onResult
    onErrorRef.current = onError
  }, [onResult, onError])

  useEffect(() => {
    langRef.current = lang
  }, [lang])

  const clearRestart = () => {
    if (restartTimer.current) {
      clearTimeout(restartTimer.current)
      restartTimer.current = null
    }
  }

  const startSession = useCallback(function runSession() {
    const SR = getSpeechRecognitionClass()
    if (!SR) return
    clearRestart()
    if (recognition.current) {
      try {
        recognition.current.onend = null
        recognition.current.abort()
      } catch {
        // ignore
      }
    }
    const rec = new SR()
    rec.continuous = true
    rec.interimResults = true
    rec.maxAlternatives = 1
    rec.lang = langRef.current || 'en-US'

    rec.onstart = () => {
      setState('listening')
      setErrorMessage('')
      restartDelay.current = 250
    }

    rec.onresult = (event) => {
      const finals = []
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        const text = result[0] ? result[0].transcript : ''
        if (result.isFinal) finals.push(text.trim())
        else interim += text
      }
      onResultRef.current?.({ finals: finals.filter(Boolean), interim: interim.trim() })
    }

    rec.onerror = (event) => {
      const code = event.error
      if (code === 'no-speech' || code === 'aborted') return // harmless, onend will restart
      const message = ERROR_MESSAGES[code] || `Speech recognition error: ${code}`
      if (code === 'not-allowed' || code === 'service-not-allowed' || code === 'audio-capture' || code === 'language-not-supported') {
        wantListening.current = false
        setState('error')
      } else {
        restartDelay.current = Math.min(restartDelay.current * 2, 8000)
      }
      setErrorMessage(message)
      onErrorRef.current?.(code, message)
    }

    rec.onend = () => {
      recognition.current = null
      if (wantListening.current) {
        setState('starting')
        setRestartCount((n) => n + 1)
        restartTimer.current = setTimeout(runSession, restartDelay.current)
      } else {
        setState((s) => (s === 'error' ? s : 'idle'))
      }
    }

    recognition.current = rec
    try {
      rec.start()
    } catch (err) {
      // Calling start() twice throws in Chrome; just try again shortly.
      restartTimer.current = setTimeout(runSession, 500)
      void err
    }
  }, [])

  const start = useCallback(() => {
    if (!supported) return
    wantListening.current = true
    setState('starting')
    setErrorMessage('')
    restartDelay.current = 250
    startSession()
  }, [supported, startSession])

  const stop = useCallback(() => {
    wantListening.current = false
    clearRestart()
    if (recognition.current) {
      try {
        recognition.current.stop()
      } catch {
        // ignore
      }
    }
    setState('idle')
  }, [])

  // Stop cleanly when the page closes.
  useEffect(() => {
    return () => {
      wantListening.current = false
      clearRestart()
      if (recognition.current) {
        try {
          recognition.current.onend = null
          recognition.current.abort()
        } catch {
          // ignore
        }
      }
    }
  }, [])

  return { supported, state, errorMessage, restartCount, start, stop }
}
