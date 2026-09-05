import { useEffect, useRef } from 'react'

export default function TranscriptPanel({ segments, interimText, listening, compact = false }) {
  const box = useRef(null)

  // Keep the newest words visible by scrolling only inside this box, never the whole page.
  useEffect(() => {
    const el = box.current
    if (el) el.scrollTop = el.scrollHeight
  }, [segments, interimText])

  return (
    <div className={`card card-transcript ${compact ? 'card-transcript-compact' : ''}`}>
      <div className="card-head">
        <p className="eyebrow">What the microphone hears</p>
        {listening && <span className="live-pill">live</span>}
      </div>
      <div className="transcript" ref={box}>
        {segments.length === 0 && !interimText && (
          <p className="muted">
            {listening ? 'Waiting for someone to speak…' : 'The words that are recognized will show up here.'}
          </p>
        )}
        {segments.map((seg) => (
          <div key={seg.id} className="transcript-line">
            <p>{seg.text}</p>
            {seg.refs.length > 0 && (
              <div className="transcript-refs">
                {seg.refs.map((r, i) => (
                  <span key={`${r.key}-${i}`} className="ref-tag">
                    {r.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        {interimText && <p className="transcript-interim">{interimText}</p>}
      </div>
    </div>
  )
}
