import { NewsletterForm, NewsletterTrust } from './NewsletterForm';
import { SpriteFire } from './Icons';

export function FinalCTASection() {
  return (
    <section style={{ padding: '112px 32px', borderTop: '1px solid var(--border-subtle)',
      position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 500, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, rgba(255,107,61,0.18) 0%, transparent 60%)',
        filter: 'blur(40px)',
      }}/>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <SpriteFire size={56}/>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--text-hi)',
          margin: '24px 0 16px', letterSpacing: '0.02em', lineHeight: 1.15 }}>
          BE AT THE TABLE<br/><span style={{ color: 'var(--ember)' }}>WHEN THE FIRE IS LIT.</span>
        </h2>
        <p style={{ fontSize: 17, color: 'var(--text-body)', lineHeight: 1.6,
          margin: '0 auto 32px', maxWidth: 560 }}>
          One email when the Kickstarter goes live. Early-bird tiers. Behind-the-scenes notes from the build.
          That's it. No drip campaigns, no Black Friday garbage.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <NewsletterForm size="hero"/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <NewsletterTrust/>
        </div>
      </div>
    </section>
  );
}
