import { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { CTABanner } from '../components/sections/CTABanner';
import { IntroOverlay } from '../components/IntroOverlay';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/ServicesCardPeel';
import Portfolio from '../sections/Portfolio';
import Contact from '../sections/Contact';

export default function Home() {
  const [introDone, setIntroDone] = useState(
    () =>
      sessionStorage.getItem('hl-intro') === '1' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  // Kept mounted through its own exit (curtain-lift) animation: `introDone` flips
  // as soon as the lift starts (to hand off to the hero timeline), which would
  // otherwise cause React to unmount the overlay before the lift is visible.
  const [showIntro, setShowIntro] = useState(() => !introDone);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {showIntro && (
        <IntroOverlay
          onComplete={() => setIntroDone(true)}
          onExited={() => setShowIntro(false)}
        />
      )}
      <Navbar />
      <main className="flex-1">
        <Hero introReady={introDone} />
        <About />
        <Services />
        <Portfolio />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
