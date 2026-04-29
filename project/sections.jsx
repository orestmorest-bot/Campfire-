// All the page sections except Hero. Each is exported as a window global.

// ── Promo video ──────────────────────────────────────────────────────────────
const VideoSection = () => (
  <section id="video" style={{ padding: "80px 32px", borderTop: "1px solid var(--border-subtle)" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <SectionEyebrow label="WATCH" title="A little look at what we're building. We think you'll smile."/>
      <div style={{
        position: "relative", aspectRatio: "16 / 9",
        background: "#0F0805",
        border: "1px solid rgba(255,107,61,0.25)",
        marginTop: 32, overflow: "hidden",
      }}>
        <Brackets size={16} thickness={2}/>
        {/* placeholder pattern */}
        <div style={{
          position: "absolute", inset: 0,
          background: "repeating-linear-gradient(45deg, rgba(255,107,61,0.04) 0 2px, transparent 2px 12px)",
        }}/>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, rgba(255,107,61,0.18) 0%, transparent 65%)",
        }}/>
        {/* video placeholder marker */}
        <div style={{
          position: "absolute", top: 16, left: 16,
          fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ember)",
          letterSpacing: "0.14em", textTransform: "uppercase",
        }}>▸ VIDEO_PLACEHOLDER.MP4 // SWAP IN PRODUCTION</div>
        <div style={{
          position: "absolute", top: 16, right: 16,
          fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)",
          letterSpacing: "0.14em",
        }}>00:00 / 01:32</div>

        {/* play button */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <button style={{
            width: 96, height: 96, borderRadius: 999,
            background: "var(--ember)", border: 0, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", boxShadow: "0 0 0 8px rgba(255,107,61,0.18), 0 0 0 24px rgba(255,107,61,0.08), 0 16px 60px rgba(255,107,61,0.4)",
          }}>
            <IconPlay size={32} style={{ marginLeft: 6 }}/>
          </button>
        </div>

        {/* bottom strip */}
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0,
          padding: "16px 20px", background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <SpriteFire size={20}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 13,
              color: "var(--text-hi)", letterSpacing: "0.04em" }}>CAMPFIRE // A QUICK PEEK</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)",
              letterSpacing: "0.08em" }}>Press play — we made it short and a little weird, on purpose.</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── The ghosting problem ────────────────────────────────────────────────────
const ProblemSection = () => (
  <section id="problem" style={{ padding: "112px 32px", borderTop: "1px solid var(--border-subtle)",
    background: "#13191E", position: "relative", overflow: "hidden" }}>
    <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 64, alignItems: "center" }}>
        <div>
          <SectionEyebrow label="WHY WE'RE BUILDING THIS" title="Roleplay is wonderful. The tools we use for it aren't."/>
          <p style={{ fontSize: 18, color: "var(--text-body)", lineHeight: 1.65,
            margin: "20px 0 0", textWrap: "pretty", maxWidth: 540 }}>
            Most of us write roleplay in DMs and Discord servers — places that weren't really designed for stories.
            <br/><br/>
            So things go a little sideways. Replies trail off mid-arc. It's hard to tell if a partner's tone matches yours before you start. Characters live in scattered docs no one else can find. Great writers can't easily meet each other.
            <br/><br/>
            <b style={{ color: "var(--text-hi)" }}>None of this is anyone's fault.</b> It's just what happens when a hobby outgrows its tools. Campfire is our love letter to roleplay — a place that finally fits the shape of how we actually write together.
          </p>
          <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0,
            border: "1px solid rgba(255,107,61,0.2)", background: "#20140C",
            position: "relative" }}>
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

const Stat = ({ n, label }) => (
  <div style={{ flex: 1, padding: "16px 18px", borderRight: "1px solid rgba(255,107,61,0.15)" }}>
    <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--ember)",
      letterSpacing: "0.02em" }}>{n}</div>
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)",
      letterSpacing: "0.12em", marginTop: 6, lineHeight: 1.4 }}>{label}</div>
  </div>
);

// faux dm fading out
const DMScreenshot = () => (
  <div style={{ background: "#1B2229", border: "1px solid var(--border-subtle)",
    borderRadius: 8, padding: 18, position: "relative", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14,
      paddingBottom: 12, borderBottom: "1px solid var(--border-subtle)" }}>
      <div style={{ width: 32, height: 32, borderRadius: 999,
        background: "linear-gradient(135deg,#A78BFA,#60A5FA)" }}/>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: "var(--text-hi)" }}>moonwriter_22</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)",
          letterSpacing: "0.06em" }}>LAST SEEN · 6 DAYS AGO</div>
      </div>
      <span style={{ width: 8, height: 8, background: "var(--text-dim)", borderRadius: 999 }}/>
    </div>
    <Bubble fromMe={true} time="MON 14:22" lines={["Hey! Loved your prompt. Drafting Mira's POV now —",
      "want me to lean dark or keep it hopeful?"]}/>
    <Bubble fromMe={false} time="MON 19:01" lines={["omg yes either is fine, super excited 🔥"]}/>
    <Bubble fromMe={true} time="TUE 09:44" lines={["Sent! 812 words, ends on a cliff.",
      "No pressure on length btw."]}/>
    <Bubble fromMe={false} time="WED 23:10" lines={["k brb"]} fade={0.7}/>
    <Bubble fromMe={true} time="FRI 18:30" lines={["Hey, no rush — just checking in?"]} fade={0.5}/>
    <Bubble fromMe={true} time="MON 11:02" lines={["…"]} fade={0.3}/>
    <div style={{
      marginTop: 14, padding: "12px 14px",
      background: "rgba(255,107,61,0.06)",
      border: "1px solid rgba(255,107,61,0.25)",
      fontFamily: "var(--font-mono)", fontSize: 11,
      color: "var(--ember)", letterSpacing: "0.08em", textTransform: "uppercase",
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <IconGhost size={14}/> THE STORY DESERVED AN ENDING. WE'RE BUILDING ONE.
    </div>
  </div>
);

const Bubble = ({ fromMe, time, lines, fade = 1 }) => (
  <div style={{ display: "flex", flexDirection: "column",
    alignItems: fromMe ? "flex-end" : "flex-start", marginBottom: 8, opacity: fade }}>
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)",
      letterSpacing: "0.1em", marginBottom: 3 }}>{time}</div>
    <div style={{
      maxWidth: "78%",
      background: fromMe ? "rgba(255,107,61,0.18)" : "var(--surface-card)",
      border: fromMe ? "1px solid rgba(255,107,61,0.3)" : "1px solid var(--border-subtle)",
      padding: "8px 12px", fontSize: 13, color: "var(--text-body)", lineHeight: 1.45,
      borderRadius: 8,
    }}>
      {lines.map((l, i) => <div key={i}>{l}</div>)}
    </div>
  </div>
);

// ── Features (4-up — partner matching, open sessions, feedback, levels) ─────
const FeaturesSection = () => (
  <section id="features" style={{ padding: "112px 32px", borderTop: "1px solid var(--border-subtle)" }}>
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
        <SectionEyebrow label="WHAT WE'RE BUILDING" title="A warmer place to write together."/>
        <p style={{ fontSize: 17, color: "var(--text-body)", lineHeight: 1.6,
          margin: "20px auto 0", textWrap: "pretty" }}>
          Four small ideas that, together, make showing up feel a lot easier — for you and for the people you write with.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginTop: 64 }}>
        <FeatureCard
          n="01" sprite={SpriteParty} icon={<IconUsers size={20}/>}
          title="Match by character, not by writer"
          body="Roleplay is about characters, not résumés. On Campfire you build the characters you want to play — their voice, world, vibe — and other writers find the characters they want to write opposite. One writer, many characters, many possible stories."
          chip="CHARACTER PROFILES · SHIP MAY"
          mock={<MatchMock/>}
        />
        <FeatureCard
          n="02" sprite={SpriteScroll} icon={<IconEye size={20}/>}
          title="Open sessions, viewer mode"
          body="Open your roleplay to spectators. They cheer, react, leave kudos. You build an audience, your partner gets a real one watching them show up."
          chip="LIVE ROOMS · BETA NOW"
          mock={<ViewerMock/>}
        />
        <FeatureCard
          n="03" sprite={SpriteShield} icon={<IconStar size={20}/>}
          title="Show off the kind words you've earned"
          body="After a story, partners can leave you little notes — vivid scenes, kept the pace going, fun to write with. If you'd like, you can pin those to your profile so new partners get a sense of what it's like to write with you. Totally optional, totally yours."
          chip="KUDOS · OPEN BETA"
          mock={<KudosMock/>}
        />
        <FeatureCard
          n="04" sprite={SpriteD20} icon={<IconLevelUp size={20}/>}
          title="Little wins for showing up"
          body="Reply, finish a chapter, leave a thoughtful prompt — collect tiny milestones along the way. Nothing punishing, nothing public unless you want it to be. Just a friendly nudge that what you do here matters."
          chip="MILESTONES · DESIGN PHASE"
          mock={<LevelMock/>}
        />
      </div>
    </div>
  </section>
);

const FeatureCard = ({ n, sprite: Sprite, icon, title, body, chip, mock }) => (
  <article style={{
    background: "var(--surface-card)", padding: 28, position: "relative",
    boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column",
    gap: 20, minHeight: 380,
  }}>
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
      <div style={{
        width: 48, height: 48, background: "rgba(255,107,61,0.12)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Sprite size={24}/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ember)",
          letterSpacing: "0.14em", marginBottom: 6 }}>{n} //</div>
        <h3 style={{ fontFamily: "var(--font-body)", fontSize: 22, fontWeight: 800,
          color: "var(--text-hi)", margin: 0, letterSpacing: "-0.01em" }}>{title}</h3>
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)",
        letterSpacing: "0.1em", padding: "4px 8px", border: "1px solid var(--border-subtle)" }}>{chip}</span>
    </div>
    <p style={{ fontSize: 14.5, color: "var(--text-body)", lineHeight: 1.6, margin: 0,
      textWrap: "pretty" }}>{body}</p>
    <div style={{ marginTop: "auto" }}>{mock}</div>
  </article>
);

const MatchMock = () => (
  <div style={{ background: "#161E24", padding: 14, border: "1px solid var(--border-subtle)" }}>
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)",
      letterSpacing: "0.12em", marginBottom: 10 }}>WRAITHFOX · PLAYS 3 CHARACTERS</div>
    {[
      ["Kael", "morally grey duelist"],
      ["Mira", "soft-spoken healer"],
      ["The Stranger", "unreliable narrator"],
    ].map(([n, d], i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span style={{ width: 18, height: 18, background: "#3A2A1F",
          border: "1px solid var(--border-subtle)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--ember)",
          fontWeight: 700 }}>{n[0]}</span>
        <span style={{ fontFamily: "var(--font-app)", fontSize: 12, color: "var(--text-hi)",
          fontWeight: 700 }}>{n}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>· {d}</span>
      </div>
    ))}
    <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--border-subtle)",
      fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ember)",
      letterSpacing: "0.06em" }}>▸ PICK A CHARACTER · START A STORY</div>
  </div>
);

const ViewerMock = () => (
  <div style={{ background: "#161E24", padding: 14, border: "1px solid var(--border-subtle)",
    display: "flex", alignItems: "center", gap: 12 }}>
    <div style={{ display: "flex", marginRight: 4 }}>
      {[0,1,2,3,4].map(i => (
        <div key={i} style={{ width: 24, height: 24, borderRadius: 999,
          background: ["#A78BFA","#60A5FA","#FBBF24","#F87171","#4ADE80"][i],
          marginLeft: i ? -8 : 0, border: "2px solid #161E24" }}/>
      ))}
    </div>
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-body)",
      letterSpacing: "0.04em" }}>
      <span style={{ color: "var(--text-hi)", fontWeight: 700 }}>23</span> watching ·
      <span style={{ color: "var(--ember)", marginLeft: 6 }}>+12 kudos</span>
    </div>
    <span style={{ marginLeft: "auto", background: "var(--damage)", color: "#fff",
      fontFamily: "var(--font-mono)", fontSize: 9, padding: "3px 7px",
      letterSpacing: "0.08em", fontWeight: 700 }}>● LIVE</span>
  </div>
);

const KudosMock = () => (
  <div style={{ background: "#161E24", padding: 14, border: "1px solid var(--border-subtle)" }}>
    {[
      ["vivid scenes", "☆"], ["kept the pace going", "☆"], ["fun to write with", "☆"],
    ].map(([k, v]) => (
      <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--ember)" }}>{v}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-body)",
          letterSpacing: "0.04em", flex: 1 }}>{k}</span>
      </div>
    ))}
    <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--border-subtle)",
      display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 12, height: 12, border: "1px solid var(--ember)", display: "inline-block",
        position: "relative" }}>
        <span style={{ position: "absolute", inset: 2, background: "var(--ember)" }}/>
      </span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)",
        letterSpacing: "0.08em" }}>SHOW THESE ON MY PROFILE · OPTIONAL</span>
    </div>
  </div>
);

const LevelMock = () => (
  <div style={{ background: "#161E24", padding: 14, border: "1px solid var(--border-subtle)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--xp)",
        letterSpacing: "0.02em" }}>LV 12</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)",
        letterSpacing: "0.1em" }}>JOURNEYMAN<br/>WRITER</div>
      <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11,
        color: "var(--xp)", fontWeight: 700 }}>+18 XP</span>
    </div>
    <div style={{ height: 8, background: "var(--surface-input)" }}>
      <div style={{ width: "62%", height: "100%", background: "var(--xp)" }}/>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4,
      fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)",
      letterSpacing: "0.08em" }}>
      <span>1,240 / 2,000</span><span>NEXT · LV 13 SCRIBE</span>
    </div>
  </div>
);

// ── Kickstarter teaser ──────────────────────────────────────────────────────
const KickstarterSection = () => (
  <section id="kickstarter" style={{ padding: "112px 32px", borderTop: "1px solid var(--border-subtle)",
    background: "#13191E" }}>
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
        <div>
          <SectionEyebrow label="THE KICKSTARTER" title="June 2026. Subscribers go first."/>
          <p style={{ fontSize: 17, color: "var(--text-body)", lineHeight: 1.6, margin: "20px 0 0",
            textWrap: "pretty", maxWidth: 520 }}>
            We're building Campfire as a community-funded platform. No VCs, no growth-hacks, no algorithmic feed
            optimized for outrage. Subscribers to this newsletter get the early-bird tiers <b style={{ color: "var(--text-hi)" }}>24 hours before everyone else</b> — and the pledges in those first 24 hours have always sold out.
          </p>
          <div style={{ marginTop: 32, padding: 20, border: "1px solid rgba(255,107,61,0.25)",
            background: "#20140C", position: "relative" }}>
            <Brackets/>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--ember)",
              letterSpacing: "0.14em", marginBottom: 12 }}>▸ ROADMAP</div>
            {[
              ["MAR 26", "Closed alpha", "done"],
              ["MAY 26", "Open beta", "active"],
              ["JUN 26", "Kickstarter launch", "upcoming"],
              ["SEP 26", "v1 public release", "upcoming"],
            ].map(([d, t, s], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 0",
                borderTop: i ? "1px solid rgba(255,107,61,0.1)" : "none" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)",
                  letterSpacing: "0.08em", width: 64 }}>{d}</span>
                <span style={{ flex: 1, fontFamily: "var(--font-app)", fontWeight: 700, fontSize: 14,
                  color: s === "done" ? "var(--text-muted)" : "var(--text-hi)",
                  textDecoration: s === "done" ? "line-through" : "none" }}>{t}</span>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 9, padding: "3px 8px",
                  letterSpacing: "0.1em", fontWeight: 700,
                  background: s === "done" ? "var(--text-dim)" :
                              s === "active" ? "var(--crit)" : "rgba(255,107,61,0.18)",
                  color: s === "active" ? "#0A2913" :
                         s === "upcoming" ? "var(--ember)" : "#fff",
                  border: s === "upcoming" ? "1px solid rgba(255,107,61,0.4)" : "none",
                }}>
                  {s === "done" ? "SHIPPED" : s === "active" ? "● LIVE" : "PLANNED"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tier preview */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)",
            letterSpacing: "0.14em", textTransform: "uppercase" }}>▸ EARLY-BIRD TIERS · PREVIEW</div>
          <Tier price="$15" name="Camper" perks={["Early access · v1 release", "Founder badge", "Discord role"]}/>
          <Tier price="$45" name="Storyteller" featured perks={["Everything in Camper", "Custom GM mark", "Beta access · all features", "Founders' digest", "Name in credits"]}/>
          <Tier price="$120" name="Mythbuilder" perks={["Everything above", "Co-design a feature with the team", "Lifetime supporter tag", "Limited · 50 tiers only"]} limited/>
        </div>
      </div>
    </div>
  </section>
);

const Tier = ({ price, name, perks, featured, limited }) => (
  <div style={{
    background: featured ? "#20140C" : "var(--surface-card)",
    border: featured ? "1px solid rgba(255,107,61,0.45)" : "1px solid var(--border-subtle)",
    padding: "18px 22px", position: "relative",
    boxShadow: featured ? "0 12px 32px rgba(255,107,61,0.12)" : "none",
  }}>
    {featured && <Brackets/>}
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 22,
        color: featured ? "var(--ember)" : "var(--text-hi)", letterSpacing: "0.02em" }}>{price}</span>
      <span style={{ fontFamily: "var(--font-app)", fontWeight: 700, fontSize: 14,
        color: "var(--text-hi)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{name}</span>
      {featured && <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 9,
        background: "var(--ember)", color: "#fff", padding: "3px 7px",
        letterSpacing: "0.1em", fontWeight: 700 }}>POPULAR</span>}
      {limited && <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 9,
        color: "var(--damage)", padding: "3px 7px", border: "1px solid var(--damage)",
        letterSpacing: "0.1em", fontWeight: 700 }}>LIMITED · 50</span>}
    </div>
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex",
      flexDirection: "column", gap: 5 }}>
      {perks.map((p, i) => (
        <li key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start",
          fontSize: 13, color: "var(--text-body)" }}>
          <IconCheck size={13} style={{ color: featured ? "var(--ember)" : "var(--crit)", marginTop: 3, flexShrink: 0 }}/>
          {p}
        </li>
      ))}
    </ul>
  </div>
);

// ── Final CTA — newsletter form repeat ──────────────────────────────────────
const FinalCTASection = () => (
  <section style={{ padding: "112px 32px", borderTop: "1px solid var(--border-subtle)",
    position: "relative", overflow: "hidden" }}>
    <div style={{
      position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)",
      width: 800, height: 500, pointerEvents: "none",
      background: "radial-gradient(ellipse at center, rgba(255,107,61,0.18) 0%, transparent 60%)",
      filter: "blur(40px)",
    }}/>
    <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
      <SpriteFire size={56}/>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 40, color: "var(--text-hi)",
        margin: "24px 0 16px", letterSpacing: "0.02em", lineHeight: 1.15 }}>
        BE AT THE TABLE<br/><span style={{ color: "var(--ember)" }}>WHEN THE FIRE IS LIT.</span>
      </h2>
      <p style={{ fontSize: 17, color: "var(--text-body)", lineHeight: 1.6,
        margin: "0 auto 32px", textWrap: "pretty", maxWidth: 560 }}>
        One email when the Kickstarter goes live. Early-bird tiers. Behind-the-scenes notes from the build.
        That's it. No drip campaigns, no Black Friday garbage.
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <NewsletterForm size="hero"/>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <NewsletterTrust/>
      </div>
    </div>
  </section>
);

// ── FAQ ─────────────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  ["When is the Kickstarter launching?",
    "June 2026. Subscribers to this newsletter get a 24-hour exclusive window on early-bird tiers before public launch."],
  ["What does Campfire actually cost at launch?",
    "Free forever for the core social features. We'll have an optional supporter tier (~$5/mo) for cosmetic perks and bigger campaign hosting. The Kickstarter funds development; backers get lifetime perks."],
  ["How does the kudos & profile system work, exactly?",
    "After a story or scene, partners can leave you short notes — things like \"vivid scenes\" or \"fun to write with.\" If you'd like, you can pin those to your profile so new partners get a feel for what writing with you is like. It's totally optional, totally yours, and you can hide any note you don't want to display."],
  ["Is this just for D&D?",
    "No. Campfire is built for prose-based roleplay first — fanfic, original characters, paragraph-RP. We support light dice and stat tracking for groups that want it, but the core is writing together."],
  ["Will my old stories / characters carry over from other platforms?",
    "Yes. We're building importers for the major platforms and Discord exports. Your characters and arcs come with you."],
  ["What about NSFW / adult content?",
    "Opt-in, gated, and segregated from main feeds. You set your own line; the matchmaker respects it. We're working with adult-content moderation specialists on the policy."],
];

const FAQSection = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <section id="faq" style={{ padding: "112px 32px", borderTop: "1px solid var(--border-subtle)",
      background: "#13191E" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <SectionEyebrow label="QUESTIONS" title="Honest answers, while we have your attention."/>
        <div style={{ marginTop: 40 }}>
          {FAQ_ITEMS.map(([q, a], i) => (
            <div key={i} style={{
              borderTop: "1px solid var(--border-subtle)",
              borderBottom: i === FAQ_ITEMS.length - 1 ? "1px solid var(--border-subtle)" : "none",
            }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                width: "100%", background: "transparent", border: 0, color: "inherit",
                padding: "20px 0", display: "flex", alignItems: "center", gap: 16,
                cursor: "pointer", textAlign: "left",
              }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ember)",
                  letterSpacing: "0.1em", width: 32 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ flex: 1, fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 17,
                  color: "var(--text-hi)" }}>{q}</span>
                <span style={{ color: "var(--text-muted)",
                  transform: open === i ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 200ms" }}>
                  <IconChevronDown size={18}/>
                </span>
              </button>
              {open === i && (
                <div style={{ paddingLeft: 48, paddingBottom: 24, paddingRight: 24,
                  fontSize: 15, color: "var(--text-body)", lineHeight: 1.65, textWrap: "pretty" }}>
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Footer ──────────────────────────────────────────────────────────────────
const SiteFooter = () => (
  <footer style={{ padding: "48px 32px 32px", borderTop: "1px solid var(--border-subtle)" }}>
    <div style={{ maxWidth: 1180, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <SpriteFire size={24}/>
            <span style={{ fontFamily: "var(--font-display)", color: "var(--ember)",
              fontSize: 13, letterSpacing: "0.04em" }}>CAMPFIRE</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.55, margin: 0,
            maxWidth: 280 }}>
            Roleplay deserves better infrastructure than a DM thread. A handheld at midnight.
          </p>
        </div>
        {[
          ["Product", ["Features", "Roadmap", "Changelog", "Status"]],
          ["Kickstarter", ["Tiers preview", "FAQ", "Press kit", "Founder note"]],
          ["Community", ["Discord", "Twitter", "Manifesto", "Conduct"]],
        ].map(([title, items]) => (
          <div key={title}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)",
              letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>{title}</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex",
              flexDirection: "column", gap: 8 }}>
              {items.map(it => (
                <li key={it}><a style={{ color: "var(--text-body)", fontSize: 13,
                  textDecoration: "none", cursor: "pointer" }}>{it}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "1px solid var(--border-subtle)", marginTop: 40, paddingTop: 20,
        display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)",
          letterSpacing: "0.06em" }}>© 2026 CAMPFIRE.SYS · BUILT BY THE TABLE, FOR THE TABLE</span>
        <div style={{ display: "flex", gap: 8 }}>
          {[IconTwitter, IconDiscord].map((Ic, i) => (
            <span key={i} style={{ width: 32, height: 32, background: "#262D34", borderRadius: 6,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              color: "var(--text-body)", cursor: "pointer" }}><Ic size={14}/></span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ── Reusable section eyebrow ────────────────────────────────────────────────
const SectionEyebrow = ({ label, title, center }) => (
  <div style={{ textAlign: center ? "center" : "left" }}>
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ember)",
      letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>▸ {label}</div>
    <h2 style={{ fontFamily: "var(--font-body)", fontSize: 38, fontWeight: 800,
      lineHeight: 1.15, color: "var(--text-hi)", margin: 0,
      letterSpacing: "-0.02em", textWrap: "balance", maxWidth: 720 }}>
      {title}
    </h2>
  </div>
);

Object.assign(window, {
  VideoSection, ProblemSection, FeaturesSection,
  KickstarterSection, FinalCTASection, FAQSection, SiteFooter, SectionEyebrow,
});
