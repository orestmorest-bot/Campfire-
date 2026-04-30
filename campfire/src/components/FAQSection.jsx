import { useState } from 'react';
import { IconChevronDown } from './Icons';

const FAQ_ITEMS = [
  ['When is the Kickstarter launching?',
    'June 2026. Subscribers to this newsletter get a 24-hour exclusive window on early-bird tiers before public launch.'],
  ['What does Campfire actually cost at launch?',
    'Free forever for the core social features. We\'ll have an optional supporter tier (~$5/mo) for cosmetic perks and bigger campaign hosting. The Kickstarter funds development; backers get lifetime perks.'],
  ['How does the kudos & profile system work, exactly?',
    'After a story or scene, partners can leave you short notes — things like "vivid scenes" or "fun to write with." If you\'d like, you can pin those to your profile so new partners get a feel for what writing with you is like. It\'s totally optional, totally yours, and you can hide any note you don\'t want to display.'],
  ['Is this just for D&D?',
    'No. Campfire is built for prose-based roleplay first — fanfic, original characters, paragraph-RP. We support light dice and stat tracking for groups that want it, but the core is writing together.'],
  ['Will my old stories / characters carry over from other platforms?',
    'Yes. We\'re building importers for the major platforms and Discord exports. Your characters and arcs come with you.'],
  ['What about NSFW / adult content?',
    'Opt-in, gated, and segregated from main feeds. You set your own line; the matchmaker respects it. We\'re working with adult-content moderation specialists on the policy.'],
];

export function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" style={{ padding: '112px 32px', borderTop: '1px solid var(--border-subtle)',
      background: '#13191E' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ember)',
            letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>▸ QUESTIONS</div>
          <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 38, fontWeight: 800,
            lineHeight: 1.15, color: 'var(--text-hi)', margin: 0, letterSpacing: '-0.02em' }}>
            Honest answers, while we have your attention.
          </h2>
        </div>
        <div style={{ marginTop: 40 }}>
          {FAQ_ITEMS.map(([q, a], i) => (
            <div key={i} style={{
              borderTop: '1px solid var(--border-subtle)',
              borderBottom: i === FAQ_ITEMS.length - 1 ? '1px solid var(--border-subtle)' : 'none',
            }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                width: '100%', background: 'transparent', border: 0, color: 'inherit',
                padding: '20px 0', display: 'flex', alignItems: 'center', gap: 16,
                cursor: 'pointer', textAlign: 'left',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ember)',
                  letterSpacing: '0.1em', width: 32 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ flex: 1, fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 17,
                  color: 'var(--text-hi)' }}>{q}</span>
                <span style={{ color: 'var(--text-muted)',
                  transform: open === i ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 200ms', flexShrink: 0 }}>
                  <IconChevronDown size={18}/>
                </span>
              </button>
              {open === i && (
                <div style={{ paddingLeft: 48, paddingBottom: 24, paddingRight: 24,
                  fontSize: 15, color: 'var(--text-body)', lineHeight: 1.65 }}>
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
