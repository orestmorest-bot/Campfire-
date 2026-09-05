export default function HistoryList({ items, onOpen, onClear }) {
  return (
    <div className="card">
      <div className="card-head">
        <p className="eyebrow">Scriptures this meeting</p>
        {items.length > 0 && (
          <button type="button" className="btn btn-ghost btn-small" onClick={onClear}>
            Clear
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <p className="muted">Nothing yet.</p>
      ) : (
        <ul className="history">
          {items.map((item) => (
            <li key={item.id}>
              <button type="button" className="history-item" onClick={() => onOpen(item)} title="Open this scripture again">
                <span className="history-label">{item.ref.label}</span>
                <span className="history-time">
                  {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
