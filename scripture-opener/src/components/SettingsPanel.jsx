import { OPEN_MODES, LANGUAGE_PRESETS, SPEECH_LANGUAGES } from '../lib/links.js'

export default function SettingsPanel({ settings, onChange, onReset, onTest }) {
  const update = (patch) => onChange({ ...settings, ...patch })

  const applyPreset = (code) => {
    const preset = LANGUAGE_PRESETS.find((p) => p.code === code)
    if (!preset) return
    update({ wtlocale: preset.code, wolLang: preset.wol, pub: preset.pub })
  }

  const presetMatch = LANGUAGE_PRESETS.find(
    (p) => p.code === settings.wtlocale && p.wol === settings.wolLang && p.pub === settings.pub,
  )
  const speechMatch = SPEECH_LANGUAGES.find((l) => l.code === settings.speechLang)

  return (
    <section className="card settings">
      <div className="card-head">
        <p className="eyebrow">Settings</p>
        <div className="row-gap">
          <button type="button" className="btn btn-small" onClick={onTest}>
            Test with John 3:16
          </button>
          <button type="button" className="btn btn-ghost btn-small" onClick={onReset}>
            Reset to defaults
          </button>
        </div>
      </div>

      <div className="settings-grid">
        <fieldset>
          <legend>Where should scriptures open?</legend>
          {OPEN_MODES.map((mode) => (
            <label key={mode.id} className="radio">
              <input
                type="radio"
                name="openMode"
                value={mode.id}
                checked={settings.openMode === mode.id}
                onChange={() => update({ openMode: mode.id })}
              />
              <span>
                <span className="radio-title">{mode.label}</span>
                <span className="radio-hint">{mode.hint}</span>
              </span>
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Behaviour</legend>
          <label className="check">
            <input type="checkbox" checked={settings.autoOpen} onChange={(e) => update({ autoOpen: e.target.checked })} />
            <span>Open scriptures automatically (otherwise they are only listed and you click them)</span>
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={settings.openChapterOnly}
              onChange={(e) => update({ openChapterOnly: e.target.checked })}
            />
            <span>Also open when only a chapter is mentioned, such as “Psalm 83”</span>
          </label>
          <label className="check">
            <input type="checkbox" checked={settings.fastMode} onChange={(e) => update({ fastMode: e.target.checked })} />
            <span>Fast mode: open as soon as the words are recognized, without waiting for the end of the sentence</span>
          </label>
        </fieldset>

        <fieldset>
          <legend>Bible language (for the links)</legend>
          <label className="field">
            <span>Preset</span>
            <select value={presetMatch ? presetMatch.code : ''} onChange={(e) => applyPreset(e.target.value)}>
              {!presetMatch && <option value="">Custom</option>}
              {LANGUAGE_PRESETS.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
          <div className="field-row">
            <label className="field">
              <span>jw.org language code</span>
              <input type="text" value={settings.wtlocale} onChange={(e) => update({ wtlocale: e.target.value.trim() })} />
            </label>
            <label className="field">
              <span>Online Library language</span>
              <input type="text" value={settings.wolLang} onChange={(e) => update({ wolLang: e.target.value.trim() })} />
            </label>
            <label className="field">
              <span>Bible edition code</span>
              <input type="text" value={settings.pub} onChange={(e) => update({ pub: e.target.value.trim() })} />
            </label>
          </div>
          <p className="muted small">
            English uses code E, language “en” and edition “nwtsty” (the study edition). If a link does not work in
            your language, try edition “nwt”.
          </p>
        </fieldset>

        <fieldset>
          <legend>Speech language</legend>
          <label className="field">
            <span>What language is spoken at the meeting?</span>
            <select
              value={speechMatch ? speechMatch.code : ''}
              onChange={(e) => e.target.value && update({ speechLang: e.target.value })}
            >
              {!speechMatch && <option value="">Custom ({settings.speechLang})</option>}
              {SPEECH_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Or type a language code</span>
            <input type="text" value={settings.speechLang} onChange={(e) => update({ speechLang: e.target.value.trim() })} />
          </label>
          <p className="muted small">
            The app currently understands Bible book names in English. Changing this to another language only
            changes what the speech service listens for.
          </p>
        </fieldset>
      </div>
    </section>
  )
}
