import './tokens.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VideoSection } from './components/VideoSection';
import { ProblemSection } from './components/ProblemSection';
import { FeaturesSection } from './components/FeaturesSection';
import { KickstarterSection } from './components/KickstarterSection';
import { FinalCTASection } from './components/FinalCTASection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div style={{ background: 'var(--bg-app)', color: 'var(--text-body)', minWidth: 1024 }}>
      <Header/>
      <Hero layout="split" headline="ghost-empathy"/>
      <VideoSection/>
      <ProblemSection/>
      <FeaturesSection/>
      <KickstarterSection/>
      <FinalCTASection/>
      <FAQSection/>
      <Footer/>
    </div>
  );
}
