import { SpriteParty, SpriteScroll, SpriteShield, SpriteD20, IconUsers, IconEye, IconStar, IconLevelUp } from './Icons';

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

const MatchMock = () => (
  <div style={{ background: '#161E24', padding: 14, border: '1px solid var(--border-subtle)' }}>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
      letterSpacing: '0.12em', marginBottom: 10 }}>WRAITHFOX · PLAYS 3 CHARACTERS</div>
    {[['Kael', 'morally grey duelist'], ['Mira', 'soft-spoken healer'], ['The Stranger', 'unreliable narrator']].map(([n, d], i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <span style={{ width: 18, height: 18, background: '#3A2A1F',
          border: '1px solid var(--border-subtle)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ember)', fontWeight: 700 }}>{n[0]}</span>
        <span style={{ fontFamily: 'var(--font-app)', fontSize: 12, color: 'var(--text-hi)', fontWeight: 700 }}>{n}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>· {d}</span>
      </div>
    ))}
    <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ember)', letterSpacing: '0.06em' }}>
      ▸ PICK A CHARACTER · START A STORY
    </div>
  </div>
);

const ViewerMock = () => (
  <div style={{ background: '#161E24', padding: 14, border: '1px solid var(--border-subtle)',
    display: 'flex', alignItems: 'center', gap: 12 }}>
    <div style={{ display: 'flex', marginRight: 4 }}>
      {['#A78BFA','#60A5FA','#FBBF24','#F87171','#4ADE80'].map((c, i) => (
        <div key={i} style={{ width: 24, height: 24, borderRadius: 999,
          background: c, marginLeft: i ? -8 : 0, border: '2px solid #161E24' }}/>
      ))}
    </div>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-body)', letterSpacing: '0.04em' }}>
      <span style={{ color: 'var(--text-hi)', fontWeight: 700 }}>23</span> watching ·
      <span style={{ color: 'var(--ember)', marginLeft: 6 }}>+12 kudos</span>
    </div>
    <span style={{ marginLeft: 'auto', background: 'var(--damage)', color: '#fff',
      fontFamily: 'var(--font-mono)', fontSize: 9, padding: '3px 7px',
      letterSpacing: '0.08em', fontWeight: 700 }}>● LIVE</span>
  </div>
);

const KudosMock = () => (
  <div style={{ background: '#161E24', padding: 14, border: '1px solid var(--border-subtle)' }}>
    {[['vivid scenes', '☆'], ['kept the pace going', '☆'], ['fun to write with', '☆']].map(([k, v]) => (
      <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ember)' }}>{v}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-body)',
          letterSpacing: '0.04em', flex: 1 }}>{k}</span>
      </div>
    ))}
    <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border-subtle)',
      display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 12, height: 12, border: '1px solid var(--ember)', display: 'inline-block', position: 'relative' }}>
        <span style={{ position: 'absolute', inset: 2, background: 'var(--ember)' }}/>
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
        letterSpacing: '0.08em' }}>SHOW THESE ON MY PROFILE · OPTIONAL</span>
    </div>
  </div>
);

const LevelMock = () => (
  <div style={{ background: '#161E24', padding: 14, border: '1px solid var(--border-subtle)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--xp)', letterSpacing: '0.02em' }}>LV 12</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>JOURNEYMAN<br/>WRITER</div>
      <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--xp)', fontWeight: 700 }}>+18 XP</span>
    </div>
    <div style={{ height: 8, background: 'var(--surface-input)' }}>
      <div style={{ width: '62%', height: '100%', background: 'var(--xp)' }}/>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4,
      fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
      <span>1,240 / 2,000</span><span>NEXT · LV 13 SCRIBE</span>
    </div>
  </div>
);

const FeatureCard = ({ n, Sprite, icon, title, body, chip, mock }) => (
  <article style={{
    background: 'var(--surface-card)', padding: 28, position: 'relative',
    boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column',
    gap: 20, minHeight: 380,
  }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
      <div style={{
        width: 48, height: 48, background: 'rgba(255,107,61,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Sprite size={24}/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ember)',
          letterSpacing: '0.14em', marginBottom: 6 }}>{n} //</div>
        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: 22, fontWeight: 800,
          color: 'var(--text-hi)', margin: 0, letterSpacing: '-0.01em' }}>{title}</h3>
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)',
        letterSpacing: '0.1em', padding: '4px 8px', border: '1px solid var(--border-subtle)',
        flexShrink: 0 }}>{chip}</span>
    </div>
    <p style={{ fontSize: 14.5, color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>{body}</p>
    <div style={{ marginTop: 'auto' }}>{mock}</div>
  </article>
);

export function FeaturesSection() {
  return (
    <section id="features" style={{ padding: '112px 32px', borderTop: '1px solid var(--border-subtle)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <SectionEyebrow label="WHAT WE'RE BUILDING" title="A warmer place to write together." center/>
          <p style={{ fontSize: 17, color: 'var(--text-body)', lineHeight: 1.6, margin: '20px auto 0' }}>
            Four small ideas that, together, make showing up feel a lot easier — for you and for the people you write with.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 64 }}>
          <FeatureCard
            n="01" Sprite={SpriteParty} icon={<IconUsers size={20}/>}
            title="Match by character, not by writer"
            body="Roleplay is about characters, not résumés. On Campfire you build the characters you want to play — their voice, world, vibe — and other writers find the characters they want to write opposite. One writer, many characters, many possible stories."
            chip="CHARACTER PROFILES · SHIP MAY"
            mock={<MatchMock/>}
          />
          <FeatureCard
            n="02" Sprite={SpriteScroll} icon={<IconEye size={20}/>}
            title="Open sessions, viewer mode"
            body="Open your roleplay to spectators. They cheer, react, leave kudos. You build an audience, your partner gets a real one watching them show up."
            chip="LIVE ROOMS · BETA NOW"
            mock={<ViewerMock/>}
          />
          <FeatureCard
            n="03" Sprite={SpriteShield} icon={<IconStar size={20}/>}
            title="Show off the kind words you've earned"
            body="After a story, partners can leave you little notes — vivid scenes, kept the pace going, fun to write with. If you'd like, you can pin those to your profile so new partners get a sense of what it's like to write with you. Totally optional, totally yours."
            chip="KUDOS · OPEN BETA"
            mock={<KudosMock/>}
          />
          <FeatureCard
            n="04" Sprite={SpriteD20} icon={<IconLevelUp size={20}/>}
            title="Little wins for showing up"
            body="Reply, finish a chapter, leave a thoughtful prompt — collect tiny milestones along the way. Nothing punishing, nothing public unless you want it to be. Just a friendly nudge that what you do here matters."
            chip="MILESTONES · DESIGN PHASE"
            mock={<LevelMock/>}
          />
        </div>
      </div>
    </section>
  );
}
