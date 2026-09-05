export default function CurrentScripture({ item, listening, onOpen, onPickAlternative }) {
  if (!item) {
    return (
      <div className="card card-current card-empty">
        <p className="eyebrow">Current scripture</p>
        {listening ? (
          <p className="muted">Listening… the first scripture that is mentioned will show up here.</p>
        ) : (
          <ol className="steps">
            <li>Click <strong>Start listening</strong> and allow the microphone.</li>
            <li>A Bible window opens. Put it next to this one.</li>
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
        <button type="button" className="btn btn-primary" onClick={() => onOpen(item)}>
          {opened ? 'Open again' : 'Open'}
        </button>
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
