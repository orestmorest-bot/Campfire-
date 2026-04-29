// Landing page assembly. Reads tweaks via useTweaks and exposes the panel.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headline": "ghost-direct",
  "layout": "centered",
  "density": "relaxed"
}/*EDITMODE-END*/;

const Landing = ({ overrides = {} }) => {
  // when used inside the design canvas, we receive overrides directly and skip the panel
  const fromCanvas = !!overrides && Object.keys(overrides).length > 0;
  const tweaksHook = (typeof useTweaks === "function") ? useTweaks(TWEAK_DEFAULTS) : null;
  const tweaks = fromCanvas ? { ...TWEAK_DEFAULTS, ...overrides } :
                 tweaksHook ? tweaksHook[0] : TWEAK_DEFAULTS;
  const setTweak = !fromCanvas && tweaksHook ? tweaksHook[1] : null;

  return (
    <div className="site" style={{ minWidth: 1280, background: "var(--bg-app)",
      color: "var(--text-body)" }}>
      <SiteHeader/>
      <Hero layout={tweaks.layout} headline={tweaks.headline} density={tweaks.density}/>
      <VideoSection/>
      <ProblemSection/>
      <FeaturesSection/>
      <KickstarterSection/>
      <FinalCTASection/>
      <FAQSection/>
      <SiteFooter/>
      {!fromCanvas && setTweak && <LandingTweaks tweaks={tweaks} setTweak={setTweak}/>}
    </div>
  );
};

const LandingTweaks = ({ tweaks, setTweak }) => (
  <TweaksPanel title="Tweaks">
    <TweakSection title="Hero">
      <TweakRadio label="Headline copy"
        value={tweaks.headline} onChange={(v) => setTweak("headline", v)}
        options={[
          { value: "ghost-direct", label: "Direct" },
          { value: "ghost-empathy", label: "Empathy" },
          { value: "ghost-question", label: "Question" },
        ]}/>
      <TweakRadio label="Layout"
        value={tweaks.layout} onChange={(v) => setTweak("layout", v)}
        options={[
          { value: "centered", label: "Centered" },
          { value: "split", label: "Split" },
          { value: "minimal", label: "Minimal" },
        ]}/>
    </TweakSection>
    <TweakSection title="Rhythm">
      <TweakRadio label="Density"
        value={tweaks.density} onChange={(v) => setTweak("density", v)}
        options={[
          { value: "relaxed", label: "Relaxed" },
          { value: "compact", label: "Compact" },
        ]}/>
    </TweakSection>
  </TweaksPanel>
);

window.Landing = Landing;
window.LANDING_DEFAULTS = TWEAK_DEFAULTS;
