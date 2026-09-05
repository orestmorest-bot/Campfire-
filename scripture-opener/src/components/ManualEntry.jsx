import { useState } from 'react'

export default function ManualEntry({ onSubmit }) {
  const [text, setText] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    if (onSubmit(value)) setText('')
  }

  return (
    <form className="card manual" onSubmit={submit}>
      <label htmlFor="manual-entry" className="eyebrow">
        Open a scripture by hand
      </label>
      <div className="manual-row">
        <input
          id="manual-entry"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="For example: Ps 83:18 or 1 Cor 13:4-8"
          autoComplete="off"
        />
        <button type="submit" className="btn">
          Open
        </button>
      </div>
    </form>
  )
}
