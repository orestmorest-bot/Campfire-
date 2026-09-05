import { useEffect, useRef, useState } from 'react'

// Shows how loud the microphone input is (0 to 1) so the user can see that the
// microphone is picking up the speaker. This is only a visual aid.
export function useMicLevel(active) {
  const [level, setLevel] = useState(0)
  const [micError, setMicError] = useState('')
  const frame = useRef(null)

  useEffect(() => {
    if (!active) return undefined
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return undefined

    let stream = null
    let audioContext = null
    let cancelled = false

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop())
          return
        }
        stream = s
        setMicError('')
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        if (!AudioCtx) return
        audioContext = new AudioCtx()
        const source = audioContext.createMediaStreamSource(stream)
        const analyser = audioContext.createAnalyser()
        analyser.fftSize = 512
        source.connect(analyser)
        const data = new Uint8Array(analyser.fftSize)
        const tick = () => {
          analyser.getByteTimeDomainData(data)
          let sum = 0
          for (let i = 0; i < data.length; i++) {
            const v = (data[i] - 128) / 128
            sum += v * v
          }
          const rms = Math.sqrt(sum / data.length)
          setLevel(Math.min(1, rms * 4))
          frame.current = requestAnimationFrame(tick)
        }
        tick()
      })
      .catch((err) => {
        setMicError(err && err.message ? err.message : 'Could not open the microphone.')
      })

    return () => {
      cancelled = true
      if (frame.current) cancelAnimationFrame(frame.current)
      if (stream) stream.getTracks().forEach((t) => t.stop())
      if (audioContext) audioContext.close().catch(() => {})
      setLevel(0)
    }
  }, [active])

  return { level, micError }
}
