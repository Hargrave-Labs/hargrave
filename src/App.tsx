import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CTABanner } from './components/sections/CTABanner';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/ServicesCardPeel';
import Portfolio from './sections/Portfolio';
import Contact from './sections/Contact';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
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

export default App;
