// Newsletter form — the page's primary conversion. Single email field.
// Three sizes: "hero" (big, glow), "inline" (mid, used in CTA section), "compact" (header).
// Posts to a fake handler; on submit shows a success readout.

const useNewsletter = () => {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState("idle"); // idle | loading | done | error
  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus("error"); return; }
    setStatus("loading");
    setTimeout(() => setStatus("done"), 700);
  };
  return { email, setEmail, status, submit };
};

const NewsletterForm = ({ size = "hero", autoFocus = false }) => {
  const { email, setEmail, status, submit } = useNewsletter();
  const isHero = size === "hero";
  const isCompact = size === "compact";

  if (status === "done") {
    return (
      <div style={{
        background: "rgba(74,222,128,0.08)",
        border: "1px solid rgba(74,222,128,0.4)",
        padding: isHero ? "18px 22px" : "12px 16px",
        display: "flex", alignItems: "center", gap: 12,
        maxWidth: isHero ? 520 : 420,
      }}>
        <span style={{ width: 8, height: 8, background: "var(--crit)", borderRadius: 999 }}/>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--crit)",
            letterSpacing: "0.1em", textTransform: "uppercase" }}>
            ▸ SEAT RESERVED
          </div>
          <div style={{ fontSize: 14, color: "var(--text-hi)", marginTop: 4 }}>
            We'll ping you when the Kickstarter goes live. Welcome to the table.
          </div>
        </div>
      </div>
    );
  }

  const inputH = isHero ? 56 : isCompact ? 38 : 48;
  const fontSize = isHero ? 16 : 14;

  return (
    <form onSubmit={submit} style={{
      display: "flex", gap: 0, maxWidth: isHero ? 520 : isCompact ? 360 : 480,
      width: "100%",
    }}>
      <div style={{ flex: 1, position: "relative" }}>
        <input
          type="email" placeholder="your@email.address"
          value={email} onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
          autoFocus={autoFocus}
          style={{
            width: "100%", height: inputH, padding: isHero ? "0 18px 0 44px" : "0 14px 0 38px",
            background: "var(--surface-input)",
            border: status === "error" ? "1px solid var(--damage)" : "1px solid var(--border-subtle)",
            borderRight: 0,
            borderRadius: 0,
            color: "var(--text-hi)", fontSize, fontFamily: "var(--font-mono)",
            outline: "none",
          }}
        />
        <span style={{ position: "absolute", left: isHero ? 16 : 12, top: "50%", transform: "translateY(-50%)",
          color: "var(--text-muted)" }}>
          <IconMail size={isHero ? 18 : 16}/>
        </span>
      </div>
      <button type="submit" style={{
        background: "var(--ember)", color: "#fff", border: 0,
        height: inputH, padding: isHero ? "0 24px" : isCompact ? "0 14px" : "0 20px",
        fontFamily: "var(--font-app)", fontWeight: 700, fontSize: isHero ? 14 : 13,
        textTransform: "uppercase", letterSpacing: "0.06em",
        cursor: "pointer", whiteSpace: "nowrap",
        boxShadow: isHero ? "0 0 0 1px rgba(250,137,36,0.4), 0 8px 24px rgba(250,137,36,0.18)" : "none",
        display: "inline-flex", alignItems: "center", gap: 8,
      }}>
        {status === "loading" ? "…" : (isCompact ? "Notify me" : "Notify me")}
        {!isCompact && status !== "loading" && <IconArrowRight size={14}/>}
      </button>
    </form>
  );
};

// Trust line that goes under the form
const NewsletterTrust = ({ light = false }) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 16, marginTop: 14,
    fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)",
    letterSpacing: "0.06em", flexWrap: "wrap",
  }}>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <IconCheck size={12}/> NO SPAM
    </span>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <IconCheck size={12}/> EARLY-BIRD KICKSTARTER ACCESS
    </span>
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <IconCheck size={12}/> UNSUBSCRIBE ANYTIME
    </span>
  </div>
);

window.NewsletterForm = NewsletterForm;
window.NewsletterTrust = NewsletterTrust;
