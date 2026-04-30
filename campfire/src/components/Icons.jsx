const I = ({ d, size = 18, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ display: 'block', ...style }}>{d}</svg>
);

export const IconArrowRight   = (p) => <I {...p} d={<><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>}/>;
export const IconCheck        = (p) => <I {...p} d={<path d="M20 6 9 17l-5-5"/>}/>;
export const IconPlay         = (p) => <I {...p} d={<path d="M5 3 22 12 5 21 z"/>}/>;
export const IconUsers        = (p) => <I {...p} d={<><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}/>;
export const IconEye          = (p) => <I {...p} d={<><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>}/>;
export const IconStar         = (p) => <I {...p} d={<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>}/>;
export const IconHeart        = (p) => <I {...p} d={<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>}/>;
export const IconLevelUp      = (p) => <I {...p} d={<><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></>}/>;
export const IconMessage      = (p) => <I {...p} d={<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>}/>;
export const IconMail         = (p) => <I {...p} d={<><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></>}/>;
export const IconClock        = (p) => <I {...p} d={<><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>}/>;
export const IconChevronDown  = (p) => <I {...p} d={<path d="m6 9 6 6 6-6"/>}/>;
export const IconCalendar     = (p) => <I {...p} d={<><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></>}/>;
export const IconRocket       = (p) => <I {...p} d={<><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></>}/>;
export const IconGhost        = (p) => <I {...p} d={<><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/></>}/>;
export const IconTwitter      = (p) => <I {...p} d={<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 8.5v1A11 11 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>}/>;
export const IconDiscord      = (p) => <I {...p} d={<><path d="M9 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M15 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M7.5 7.5C9 6 11 5.5 12 5.5s3 .5 4.5 2"/><path d="M7.5 16.5C9 18 11 18.5 12 18.5s3-.5 4.5-2"/><path d="M5 8a14 14 0 0 0 0 8c1 1 3 2 5 2"/><path d="M19 8a14 14 0 0 1 0 8c-1 1-3 2-5 2"/></>}/>;

export const Brackets = ({ color = 'rgba(255,107,61,0.55)', size = 12, thickness = 2 }) => {
  const base = {
    position: 'absolute', width: size, height: size, borderColor: color,
    borderStyle: 'solid', borderWidth: 0,
  };
  return (
    <>
      <span style={{ ...base, top: -1, left: -1, borderTopWidth: thickness, borderLeftWidth: thickness }}/>
      <span style={{ ...base, top: -1, right: -1, borderTopWidth: thickness, borderRightWidth: thickness }}/>
      <span style={{ ...base, bottom: -1, left: -1, borderBottomWidth: thickness, borderLeftWidth: thickness }}/>
      <span style={{ ...base, bottom: -1, right: -1, borderBottomWidth: thickness, borderRightWidth: thickness }}/>
    </>
  );
};

export const SpriteFire   = ({ size = 32, style }) => <img src="/assets/sprites/campfire.svg" width={size} height={size} style={{ imageRendering: 'pixelated', display: 'block', ...style }} alt="" />;
export const SpriteD20    = ({ size = 32, style }) => <img src="/assets/sprites/d20.svg" width={size} height={size} style={{ imageRendering: 'pixelated', display: 'block', ...style }} alt="" />;
export const SpriteScroll = ({ size = 32, style }) => <img src="/assets/sprites/scroll.svg" width={size} height={size} style={{ imageRendering: 'pixelated', display: 'block', ...style }} alt="" />;
export const SpriteShield = ({ size = 32, style }) => <img src="/assets/sprites/shield.svg" width={size} height={size} style={{ imageRendering: 'pixelated', display: 'block', ...style }} alt="" />;
export const SpriteParty  = ({ size = 32, style }) => <img src="/assets/sprites/party.svg" width={size} height={size} style={{ imageRendering: 'pixelated', display: 'block', ...style }} alt="" />;
