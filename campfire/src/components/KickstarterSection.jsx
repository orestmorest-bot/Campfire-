import { Brackets, IconCheck } from './Icons';

function SectionEyebrow({ label, title }) {
  return (
    <div>
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

const Tier = ({ price, name, perks, featured, limited }) => (
  <div style={{
    background: featured ? '#20140C' : 'var(--surface-card)',
    border: featured ? '1px solid rgba(255,107,61,0.45)' : '1px solid var(--border-subtle)',
    padding: '18px 22px', position: 'relative',
    boxShadow: featured ? '0 12px 32px rgba(255,107,61,0.12)' : 'none',
  }}>
    {featured && <Brackets/>}
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 22,
        color: featured ? 'var(--ember)' : 'var(--text-hi)', letterSpacing: '0.02em' }}>{price}</span>
      <span style={{ fontFamily: 'var(--font-app)', fontWeight: 700, fontSize: 14,
        color: 'var(--text-hi)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{name}</span>
      {featured && <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 9,
        background: 'var(--ember)', color: '#fff', padding: '3px 7px',
        letterSpacing: '0.1em', fontWeight: 700 }}>POPULAR</span>}
      {limited && <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 9,
        color: 'var(--damage)', padding: '3px 7px', border: '1px solid var(--damage)',
        letterSpacing: '0.1em', fontWeight: 700 }}>LIMITED · 50</span>}
    </div>
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
      {perks.map((p, i) => (
        <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start',
          fontSize: 13, color: 'var(--text-body)' }}>
          <IconCheck size={13} style={{ color: featured ? 'var(--ember)' : 'var(--crit)', marginTop: 3, flexShrink: 0 }}/>
          {p}
        </li>
      ))}
    </ul>
  </div>
);

export function KickstarterSection() {
  const roadmap = [
    ['MAR 26', 'Closed alpha', 'done'],
    ['MAY 26', 'Open beta', 'active'],
    ['JUN 26', 'Kickstarter launch', 'upcoming'],
    ['SEP 26', 'v1 public release', 'upcoming'],
  ];

  return (
    <section id="kickstarter" style={{ padding: '112px 32px', borderTop: '1px solid var(--border-subtle)',
      background: '#13191E' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <SectionEyebrow label="THE KICKSTARTER" title="June 2026. Subscribers go first."/>
            <p style={{ fontSize: 17, color: 'var(--text-body)', lineHeight: 1.6, margin: '20px 0 0',
              maxWidth: 520 }}>
              We're building Campfire as a community-funded platform. No VCs, no growth-hacks, no algorithmic feed
              optimized for outrage. Subscribers to this newsletter get the early-bird tiers{' '}
              <b style={{ color: 'var(--text-hi)' }}>24 hours before everyone else</b> — and the pledges in those first 24 hours have always sold out.
            </p>
            <div style={{ marginTop: 32, padding: 20, border: '1px solid rgba(255,107,61,0.25)',
              background: '#20140C', position: 'relative' }}>
              <Brackets/>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ember)',
                letterSpacing: '0.14em', marginBottom: 12 }}>▸ ROADMAP</div>
              {roadmap.map(([d, t, s], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '8px 0',
                  borderTop: i ? '1px solid rgba(255,107,61,0.1)' : 'none' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)',
                    letterSpacing: '0.08em', width: 64 }}>{d}</span>
                  <span style={{ flex: 1, fontFamily: 'var(--font-app)', fontWeight: 700, fontSize: 14,
                    color: s === 'done' ? 'var(--text-muted)' : 'var(--text-hi)',
                    textDecoration: s === 'done' ? 'line-through' : 'none' }}>{t}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9, padding: '3px 8px',
                    letterSpacing: '0.1em', fontWeight: 700,
                    background: s === 'done' ? 'var(--text-dim)' :
                                s === 'active' ? 'var(--crit)' : 'rgba(255,107,61,0.18)',
                    color: s === 'active' ? '#0A2913' :
                           s === 'upcoming' ? 'var(--ember)' : '#fff',
                    border: s === 'upcoming' ? '1px solid rgba(255,107,61,0.4)' : 'none',
                  }}>
                    {s === 'done' ? 'SHIPPED' : s === 'active' ? '● LIVE' : 'PLANNED'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
              letterSpacing: '0.14em', textTransform: 'uppercase' }}>▸ EARLY-BIRD TIERS · PREVIEW</div>
            <Tier price="$15" name="Camper" perks={['Early access · v1 release', 'Founder badge', 'Discord role']}/>
            <Tier price="$45" name="Storyteller" featured perks={['Everything in Camper', 'Custom GM mark', 'Beta access · all features', 'Founders\' digest', 'Name in credits']}/>
            <Tier price="$120" name="Mythbuilder" perks={['Everything above', 'Co-design a feature with the team', 'Lifetime supporter tag', 'Limited · 50 tiers only']} limited/>
          </div>
        </div>
      </div>
    </section>
  );
}
