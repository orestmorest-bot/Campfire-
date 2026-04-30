import { Brackets, IconGhost } from './Icons';

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

const Stat = ({ n, label }) => (
  <div style={{ flex: 1, padding: '16px 18px', borderRight: '1px solid rgba(255,107,61,0.15)' }}>
    <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--ember)',
      letterSpacing: '0.02em' }}>{n}</div>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
      letterSpacing: '0.12em', marginTop: 6, lineHeight: 1.4 }}>{label}</div>
  </div>
);

const Bubble = ({ fromMe, time, lines, fade = 1 }) => (
  <div style={{ display: 'flex', flexDirection: 'column',
    alignItems: fromMe ? 'flex-end' : 'flex-start', marginBottom: 8, opacity: fade }}>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-muted)',
      letterSpacing: '0.1em', marginBottom: 3 }}>{time}</div>
    <div style={{
      maxWidth: '78%',
      background: fromMe ? 'rgba(255,107,61,0.18)' : 'var(--surface-card)',
      border: fromMe ? '1px solid rgba(255,107,61,0.3)' : '1px solid var(--border-subtle)',
      padding: '8px 12px', fontSize: 13, color: 'var(--text-body)', lineHeight: 1.45,
      borderRadius: 8,
    }}>
      {lines.map((l, i) => <div key={i}>{l}</div>)}
    </div>
  </div>
);

const DMScreenshot = () => (
  <div style={{ background: '#1B2229', border: '1px solid var(--border-subtle)',
    borderRadius: 8, padding: 18, position: 'relative', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
      paddingBottom: 12, borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ width: 32, height: 32, borderRadius: 999,
        background: 'linear-gradient(135deg,#A78BFA,#60A5FA)' }}/>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-hi)' }}>moonwriter_22</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
          letterSpacing: '0.06em' }}>LAST SEEN · 6 DAYS AGO</div>
      </div>
      <span style={{ width: 8, height: 8, background: 'var(--text-dim)', borderRadius: 999 }}/>
    </div>
    <Bubble fromMe={true} time="MON 14:22" lines={['Hey! Loved your prompt. Drafting Mira\'s POV now —', 'want me to lean dark or keep it hopeful?']}/>
    <Bubble fromMe={false} time="MON 19:01" lines={['omg yes either is fine, super excited 🔥']}/>
    <Bubble fromMe={true} time="TUE 09:44" lines={['Sent! 812 words, ends on a cliff.', 'No pressure on length btw.']}/>
    <Bubble fromMe={false} time="WED 23:10" lines={['k brb']} fade={0.7}/>
    <Bubble fromMe={true} time="FRI 18:30" lines={['Hey, no rush — just checking in?']} fade={0.5}/>
    <Bubble fromMe={true} time="MON 11:02" lines={['…']} fade={0.3}/>
    <div style={{
      marginTop: 14, padding: '12px 14px',
      background: 'rgba(255,107,61,0.06)',
      border: '1px solid rgba(255,107,61,0.25)',
      fontFamily: 'var(--font-mono)', fontSize: 11,
      color: 'var(--ember)', letterSpacing: '0.08em', textTransform: 'uppercase',
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <IconGhost size={14}/> THE STORY DESERVED AN ENDING. WE'RE BUILDING ONE.
    </div>
  </div>
);

export function ProblemSection() {
  return (
    <section id="problem" style={{ padding: '112px 32px', borderTop: '1px solid var(--border-subtle)',
      background: '#13191E', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <SectionEyebrow label="WHY WE'RE BUILDING THIS" title="Roleplay is wonderful. The tools we use for it aren't."/>
            <p style={{ fontSize: 18, color: 'var(--text-body)', lineHeight: 1.65,
              margin: '20px 0 0', maxWidth: 540 }}>
              Most of us write roleplay in DMs and Discord servers — places that weren't really designed for stories.
              <br/><br/>
              So things go a little sideways. Replies trail off mid-arc. It's hard to tell if a partner's tone matches yours before you start. Characters live in scattered docs no one else can find. Great writers can't easily meet each other.
              <br/><br/>
              <b style={{ color: 'var(--text-hi)' }}>None of this is anyone's fault.</b> It's just what happens when a hobby outgrows its tools. Campfire is our love letter to roleplay — a place that finally fits the shape of how we actually write together.
            </p>
            <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0,
              border: '1px solid rgba(255,107,61,0.2)', background: '#20140C',
              position: 'relative' }}>
              <Brackets/>
              <Stat n="Replies" label="THAT TRAIL OFF MID-STORY"/>
              <Stat n="Tone" label="YOU CAN'T TELL UNTIL YOU TRY"/>
              <Stat n="Characters" label="BURIED IN A DOC NOBODY READS"/>
            </div>
          </div>
          <DMScreenshot/>
        </div>
      </div>
    </section>
  );
}
