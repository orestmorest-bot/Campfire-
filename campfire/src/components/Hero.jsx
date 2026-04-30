import { NewsletterForm, NewsletterTrust } from './NewsletterForm';
import { Brackets, IconClock, IconEye } from './Icons';

const HEADLINES = {
  'ghost-direct': {
    h1: ['Find writers who', 'love', 'to write back.'],
    sub: 'Campfire is a friendly home for roleplay — where you create characters, find partners who fit them, and finish the stories you start. Together.',
  },
  'ghost-empathy': {
    h1: ['Every roleplay', 'deserves', 'an ending.'],
    sub: 'Half-finished arcs and silent partners aren\'t just yours — they\'re a problem with where we write. Campfire is a kinder, clearer place to find people who keep the story going.',
  },
  'ghost-question': {
    h1: ['What if your', 'next partner', 'actually replied?'],
    sub: 'Build characters, match by who they are, and write with people who love showing up. Campfire is a community that makes finishing stories feel normal again.',
  },
};

const Scanlines = () => (
  <div style={{
    position: 'absolute', inset: 0, pointerEvents: 'none',
    backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 4px)',
  }}/>
);

const EmberHaze = () => (
  <div style={{
    position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
    width: 900, height: 600, pointerEvents: 'none',
    background: 'radial-gradient(ellipse at center, rgba(255,107,61,0.12) 0%, transparent 60%)',
    filter: 'blur(40px)',
  }}/>
);

const PreLaunchPill = () => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 10,
    background: 'rgba(255,107,61,0.08)',
    border: '1px solid rgba(255,107,61,0.3)',
    padding: '7px 14px',
    fontFamily: 'var(--font-mono)', fontSize: 11,
    color: 'var(--ember)', letterSpacing: '0.12em', textTransform: 'uppercase',
  }}>
    <span style={{ width: 6, height: 6, background: 'var(--ember)', display: 'inline-block',
      borderRadius: 999, boxShadow: '0 0 8px var(--ember)' }}/>
    A NEW HOME FOR ROLEPLAY
  </div>
);

const WaitlistReadout = ({ align = 'center' }) => (
  <div style={{ marginTop: 48, display: 'flex', justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
    <div style={{
      display: 'inline-flex', alignItems: 'stretch', gap: 0,
      border: '1px solid rgba(255,107,61,0.25)',
      background: 'rgba(32,20,12,0.6)', position: 'relative',
    }}>
      <Brackets/>
      <div style={{ padding: '12px 18px', borderRight: '1px solid rgba(255,107,61,0.18)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
          letterSpacing: '0.12em', textTransform: 'uppercase' }}>WAITLIST</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, color: 'var(--ember)',
          letterSpacing: '0.04em' }}>2,847</div>
      </div>
      <div style={{ padding: '12px 18px', borderRight: '1px solid rgba(255,107,61,0.18)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
          letterSpacing: '0.12em', textTransform: 'uppercase' }}>SINCE LAST WEEK</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, color: 'var(--crit)',
          letterSpacing: '0.04em' }}>+412</div>
      </div>
      <div style={{ padding: '12px 18px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
          letterSpacing: '0.12em', textTransform: 'uppercase' }}>KICKSTARTER LAUNCH</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, color: 'var(--text-hi)',
          letterSpacing: '0.04em' }}>JUNE&nbsp;2026</div>
      </div>
    </div>
  </div>
);

const HeroAppMock = () => (
  <div style={{ position: 'relative' }}>
    <div style={{
      background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
      borderRadius: 12, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
      transform: 'rotate(-1.5deg)',
    }}>
      <div style={{ height: 36, background: '#1B2229',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', padding: '0 12px', gap: 10 }}>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: '#3A4550' }}/>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: '#3A4550' }}/>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: '#3A4550' }}/>
        <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
          dms / @wraithfox · active 4 days ago
        </span>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
          paddingBottom: 12, borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ width: 32, height: 32, background: '#3A2A1F',
            border: '1px solid var(--border-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ember)', fontWeight: 700 }}>WF</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-app)', fontWeight: 700, fontSize: 14,
              color: 'var(--text-hi)', display: 'flex', alignItems: 'center', gap: 8 }}>
              @wraithfox
              <span style={{ width: 6, height: 6, borderRadius: 999, background: '#5A4A3E' }}/>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
                fontWeight: 400, letterSpacing: '0.04em' }}>OFFLINE</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
              letterSpacing: '0.04em' }}>"Ashveil — Court of Thorns" · scene 7 of 12</div>
          </div>
        </div>

        <div style={{ background: '#2A1810', padding: '10px 12px', marginBottom: 6,
          borderLeft: '2px solid #5A4A3E' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
            letterSpacing: '0.06em', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
            <span>WRAITHFOX</span><span>MON 11:47 PM</span>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--text-body)', lineHeight: 1.55, fontStyle: 'italic' }}>
            Kael's hand stops just short of the blade. "If you walk out that door, I won't follow you this time. Say it. Tell me you want me to stay."
          </div>
        </div>

        <div style={{ background: 'rgba(255,107,61,0.06)', padding: '10px 12px', marginBottom: 10,
          borderLeft: '2px solid var(--ember)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ember)',
            letterSpacing: '0.06em', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
            <span>YOU</span><span>MON 11:52 PM · READ ✓</span>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--text-body)', lineHeight: 1.55, fontStyle: 'italic' }}>
            She turns. Slowly. The candlelight catches the wet on her lashes and she hates that he sees it. "Stay," she says, and her voice breaks on the word. "Gods help me, Kael — stay."
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 0',
          fontFamily: 'var(--font-mono)', fontSize: 10, color: '#7A5A4A',
          letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          <span style={{ flex: 1, height: 1, background: 'repeating-linear-gradient(90deg, #3A2A1F 0 4px, transparent 4px 8px)' }}/>
          <span>4 days · 11 hours of silence</span>
          <span style={{ flex: 1, height: 1, background: 'repeating-linear-gradient(90deg, #3A2A1F 0 4px, transparent 4px 8px)' }}/>
        </div>

        {[
          { label: 'TUE 8:14 AM · SENT ✓ · UNREAD', text: 'hey! no pressure but did my last reply land okay? happy to revise the tone if it was too much' },
          { label: 'WED 1:02 AM · SENT ✓ · UNREAD', text: 'i can rewrite scene 7 if you want a different direction. just let me know you\'re still in' },
          { label: 'FRI 3:41 AM · SENT ✓ · UNREAD', text: 'ok i get it. sorry for double-texting. hope you\'re okay.' },
        ].map(({ label, text }, i) => (
          <div key={i} style={{ background: 'rgba(255,107,61,0.06)',
            borderLeft: '2px solid var(--ember)', padding: '8px 10px', marginBottom: i < 2 ? 5 : 12 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ember)',
              letterSpacing: '0.1em', marginBottom: 3, display: 'flex', justifyContent: 'space-between' }}>
              <span>YOU</span><span>{label}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-body)', lineHeight: 1.5 }}>{text}</div>
          </div>
        ))}

        <div style={{ display: 'flex', gap: 8, alignItems: 'center',
          background: '#1A1410', border: '1px solid var(--border-subtle)',
          padding: '10px 12px' }}>
          <span style={{ fontSize: 13, color: '#5A4A3E', fontStyle: 'italic', flex: 1 }}>Type a reply…</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#5A4A3E', letterSpacing: '0.08em' }}>↵</span>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center',
          paddingTop: 10, marginTop: 10, borderTop: '1px solid var(--border-subtle)',
          fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
          letterSpacing: '0.06em' }}>
          <IconClock size={12}/>&nbsp;3 MESSAGES UNREAD · <IconEye size={12}/>&nbsp;1,847 WORDS WAITING FOR A REPLY
        </div>
      </div>
    </div>

    <div style={{
      position: 'absolute', bottom: -22, left: -32,
      background: '#20140C', border: '1px solid rgba(255,107,61,0.5)',
      padding: '10px 14px', transform: 'rotate(-3deg)',
      boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 22, height: 22, border: '1.5px solid var(--ember)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ember)' }}>!</div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)',
            letterSpacing: '0.12em' }}>PARTNER STATUS</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--ember)',
            fontWeight: 700, letterSpacing: '0.06em' }}>GHOSTED · 10 days</div>
        </div>
      </div>
    </div>

    <div style={{
      position: 'absolute', top: 24, right: -24,
      background: '#20140C', border: '1px solid rgba(255,107,61,0.35)',
      padding: '8px 12px', transform: 'rotate(3deg)', maxWidth: 190,
      boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)',
        letterSpacing: '0.12em', marginBottom: 3 }}>WHAT IF…</div>
      <div style={{ fontFamily: 'var(--font-app)', fontSize: 12, color: 'var(--text-hi)',
        lineHeight: 1.4, fontStyle: 'italic' }}>
        you could find partners who actually love writing back?
      </div>
    </div>
  </div>
);

export function Hero({ layout = 'split', headline = 'ghost-empathy' }) {
  const copy = HEADLINES[headline] || HEADLINES['ghost-empathy'];
  const pad = '112px 32px 80px';

  if (layout === 'split') {
    return (
      <section id="top" style={{ position: 'relative', padding: pad, overflow: 'hidden' }}>
        <Scanlines/>
        <EmberHaze/>
        <div style={{
          maxWidth: 1200, margin: '0 auto', position: 'relative',
          display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center',
        }}>
          <div>
            <PreLaunchPill/>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 52, lineHeight: 1.12,
              color: 'var(--text-hi)', margin: '28px 0 0', letterSpacing: '0.02em',
            }}>
              {copy.h1[0]}<br/>
              <span style={{ color: 'var(--ember)' }}>{copy.h1[1]}</span> {copy.h1[2]}
            </h1>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 18,
              color: 'var(--text-body)', lineHeight: 1.55,
              maxWidth: 520, margin: '24px 0 0',
            }}>
              {copy.sub}
            </p>
            <div id="hero-form" style={{ marginTop: 36 }}>
              <NewsletterForm size="hero"/>
            </div>
            <NewsletterTrust/>
            <WaitlistReadout align="left"/>
          </div>
          <HeroAppMock/>
        </div>
      </section>
    );
  }

  if (layout === 'minimal') {
    return (
      <section id="top" style={{ position: 'relative', padding: pad, overflow: 'hidden' }}>
        <Scanlines/>
        <div style={{ maxWidth: 920, margin: '0 auto', position: 'relative', textAlign: 'left' }}>
          <PreLaunchPill/>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 72, lineHeight: 1.05,
            color: 'var(--text-hi)', margin: '32px 0 0', letterSpacing: '0.01em',
          }}>
            {copy.h1[0]}<br/>
            <span style={{ color: 'var(--ember)' }}>{copy.h1[1]}</span><br/>
            {copy.h1[2]}
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 19,
            color: 'var(--text-body)', lineHeight: 1.55,
            maxWidth: 580, margin: '32px 0 0',
          }}>
            {copy.sub}
          </p>
          <div id="hero-form" style={{ marginTop: 40 }}>
            <NewsletterForm size="hero"/>
          </div>
          <NewsletterTrust/>
          <WaitlistReadout align="left"/>
        </div>
      </section>
    );
  }

  return (
    <section id="top" style={{ position: 'relative', padding: pad, overflow: 'hidden' }}>
      <Scanlines/>
      <EmberHaze/>
      <div style={{ maxWidth: 980, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
        <PreLaunchPill/>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 64, lineHeight: 1.12,
          color: 'var(--text-hi)', margin: '32px 0 0', letterSpacing: '0.02em',
        }}>
          {copy.h1[0]}<br/>
          <span style={{ color: 'var(--ember)' }}>{copy.h1[1]}</span> {copy.h1[2]}
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 19,
          color: 'var(--text-body)', lineHeight: 1.55,
          maxWidth: 620, margin: '28px auto 0',
        }}>
          {copy.sub}
        </p>
        <div id="hero-form" style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
          <NewsletterForm size="hero"/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <NewsletterTrust/>
        </div>
        <WaitlistReadout/>
      </div>
    </section>
  );
}
