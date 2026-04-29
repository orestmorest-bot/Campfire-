// Marketing Header. Sticky, with logo + nav + small "Notify me" CTA that scrolls to hero form.

const Header = ({ density = "relaxed" }) => {
  const linkStyle = {
    color: "var(--text-body)", textDecoration: "none",
    fontSize: 13, fontWeight: 500, padding: "8px 12px",
    borderRadius: 6, cursor: "pointer", transition: "color 120ms",
  };
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(22, 14, 8, 0.85)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid #2C353D",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        height: 72, padding: "0 32px",
        display: "flex", alignItems: "center", gap: 24,
      }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <SpriteFire size={28}/>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 16,
            color: "var(--ember)", letterSpacing: "0.04em" }}>CAMPFIRE</span>
          <span style={{ marginLeft: 8, padding: "3px 8px", background: "rgba(255,107,61,0.12)",
            border: "1px solid rgba(255,107,61,0.3)",
            fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ember)",
            letterSpacing: "0.1em" }}>PRE-LAUNCH</span>
        </a>
        <nav style={{ display: "flex", gap: 4, marginLeft: 16 }}>
          <a style={linkStyle} href="#problem">The problem</a>
          <a style={linkStyle} href="#features">Features</a>
          <a style={linkStyle} href="#kickstarter">Kickstarter</a>
          <a style={linkStyle} href="#faq">FAQ</a>
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)",
            display: "inline-flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ width: 6, height: 6, background: "var(--crit)", borderRadius: 999 }}/>
            <span><b style={{ color: "var(--text-hi)" }}>2,847</b> on the waitlist</span>
          </span>
          <a href="#hero-form" style={{
            background: "var(--ember)", color: "#fff", textDecoration: "none",
            border: 0, borderRadius: 7, height: 38, padding: "0 16px",
            fontFamily: "var(--font-app)", fontWeight: 700, fontSize: 13,
            cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
            boxShadow: "0 0 0 1px rgba(250,137,36,0.3), 0 4px 16px rgba(250,137,36,0.18)",
          }}>
            Notify me <IconArrowRight size={14}/>
          </a>
        </div>
      </div>
    </header>
  );
};

window.SiteHeader = Header;
