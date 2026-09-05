export default function CurrentScripture({ item, listening, href, target, onOpen, onMarkOpened, onPickAlternative }) {
  if (!item) {
    return (
      <div className="card card-current card-empty">
        <p className="eyebrow">Current scripture</p>
        {listening ? (
          <p className="muted">Listening… the first scripture that is mentioned will show up here.</p>
        ) : (
          <ol className="steps">
            <li>Click <strong>Start listening</strong> and allow the microphone.</li>
            <li>
              The Bible opens in a second window (on a phone or tablet: in the JW Library app or on jw.org). On a
              tablet, use split screen so both stay visible.
            </li>
            <li>Whenever someone says a scripture, such as “Psalm 83 verse 18”, it opens by itself.</li>
          </ol>
        )}
      </div>
    )
  }

  const { ref, opened, source } = item
  const sourceLabel = source === 'manual' ? 'typed by you' : 'heard'

  return (
    <div className="card card-current">
      <p className="eyebrow">Current scripture</p>
      <div className="current-main">
        <h2 className="current-label">{ref.label}</h2>
        {href ? (
          <a className="btn btn-primary btn-open" href={href} target={target} rel="noopener" onClick={() => onMarkOpened(item)}>
            {opened ? 'Open again' : 'Open'}
          </a>
        ) : (
          <button type="button" className="btn btn-primary btn-open" onClick={() => onOpen(item)}>
            {opened ? 'Open again' : 'Open'}
          </button>
        )}
      </div>
      <p className="muted small">
        {sourceLabel} at {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        {!opened && ' · not opened automatically'}
      </p>
      {ref.alternatives && ref.alternatives.length > 0 && (
        <div className="alternatives">
          <span className="muted small">Did they mean:</span>
          {ref.alternatives.map((alt) => (
            <button key={alt.key} type="button" className="chip" onClick={() => onPickAlternative(alt)}>
              {alt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
