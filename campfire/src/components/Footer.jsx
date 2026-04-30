import { SpriteFire, IconTwitter, IconDiscord } from './Icons';

export function Footer() {
  return (
    <footer style={{ padding: '48px 32px 32px', borderTop: '1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 32 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <SpriteFire size={24}/>
              <span style={{ fontFamily: 'var(--font-display)', color: 'var(--ember)',
                fontSize: 13, letterSpacing: '0.04em' }}>CAMPFIRE</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55, margin: 0, maxWidth: 280 }}>
              Roleplay deserves better infrastructure than a DM thread. A handheld at midnight.
            </p>
          </div>
          {[
            ['Product', ['Features', 'Roadmap', 'Changelog', 'Status']],
            ['Kickstarter', ['Tiers preview', 'FAQ', 'Press kit', 'Founder note']],
            ['Community', ['Discord', 'Twitter', 'Manifesto', 'Conduct']],
          ].map(([title, items]) => (
            <div key={title}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
                letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>{title}</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex',
                flexDirection: 'column', gap: 8 }}>
                {items.map(it => (
                  <li key={it}>
                    <a href="#" style={{ color: 'var(--text-body)', fontSize: 13, cursor: 'pointer' }}>{it}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: 40, paddingTop: 20,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
            letterSpacing: '0.06em' }}>© 2026 CAMPFIRE.SYS · BUILT BY THE TABLE, FOR THE TABLE</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {[IconTwitter, IconDiscord].map((Ic, i) => (
              <span key={i} style={{ width: 32, height: 32, background: '#262D34', borderRadius: 6,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-body)', cursor: 'pointer' }}><Ic size={14}/></span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
