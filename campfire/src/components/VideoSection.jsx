import { Brackets, IconPlay, SpriteFire } from './Icons';

function SectionEyebrow({ label, title, center }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ember)',
        letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>▸ {label}</div>
      <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 38, fontWeight: 800,
        lineHeight: 1.15, color: 'var(--text-hi)', margin: 0,
        letterSpacing: '-0.02em', maxWidth: 720 }}>
        {title}
      </h2>
    </div>
  );
}

export function VideoSection() {
  return (
    <section id="video" style={{ padding: '80px 32px', borderTop: '1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionEyebrow label="WATCH" title="A little look at what we're building. We think you'll smile."/>
        <div style={{
          position: 'relative', aspectRatio: '16 / 9',
          background: '#0F0805',
          border: '1px solid rgba(255,107,61,0.25)',
          marginTop: 32, overflow: 'hidden',
        }}>
          <Brackets size={16} thickness={2}/>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(45deg, rgba(255,107,61,0.04) 0 2px, transparent 2px 12px)',
          }}/>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(255,107,61,0.18) 0%, transparent 65%)',
          }}/>
          <div style={{
            position: 'absolute', top: 16, left: 16,
            fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ember)',
            letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>▸ VIDEO_PLACEHOLDER.MP4 // SWAP IN PRODUCTION</div>
          <div style={{
            position: 'absolute', top: 16, right: 16,
            fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
            letterSpacing: '0.14em',
          }}>00:00 / 01:32</div>

          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <button style={{
              width: 96, height: 96, borderRadius: 999,
              background: 'var(--ember)', border: 0, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', boxShadow: '0 0 0 8px rgba(255,107,61,0.18), 0 0 0 24px rgba(255,107,61,0.08), 0 16px 60px rgba(255,107,61,0.4)',
            }}>
              <IconPlay size={32} style={{ marginLeft: 6 }}/>
            </button>
          </div>

          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            padding: '16px 20px', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <SpriteFire size={20}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13,
                color: 'var(--text-hi)', letterSpacing: '0.04em' }}>CAMPFIRE // A QUICK PEEK</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
                letterSpacing: '0.08em' }}>Press play — we made it short and a little weird, on purpose.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
