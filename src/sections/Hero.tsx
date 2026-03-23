import { useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { useGSAP } from '../hooks/useGSAP';
import { Container } from '../components/ui/Container';
import { GrainOverlay } from '../components/ui/GrainOverlay';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.5, delay: 0.3 })
      .from('.hero-title-word', { y: 60, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.2')
      .from('.hero-desc', { y: 20, opacity: 0, duration: 0.7 }, '-=0.3')
      .from('.hero-cta', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.3')
      .from('.hero-stat', { y: 40, opacity: 0, duration: 0.7, stagger: 0.15 }, '-=0.4');
  }, [], ref);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" ref={ref} className="relative min-h-[calc(100vh-2rem)] flex items-center overflow-hidden rounded-[2.5rem] mx-4 mt-4 mb-4" style={{ WebkitTransform: 'translateZ(0)', isolation: 'isolate' }}>
      {/* Gradient background */}
      <div className="absolute inset-0" style={{ WebkitTransform: 'translateZ(0)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#071a12] to-[#0a0a0a]" style={{ WebkitBackfaceVisibility: 'hidden' }} />
        <div
          className="absolute bottom-0 left-0 right-0 h-[90%]"
          style={{
            background: `
              radial-gradient(ellipse 120% 70% at 20% 90%, rgba(16, 185, 129, 0.6) 0%, transparent 55%),
              radial-gradient(ellipse 100% 60% at 50% 80%, rgba(52, 211, 153, 0.4) 0%, transparent 50%),
              radial-gradient(ellipse 80% 50% at 80% 75%, rgba(6, 182, 212, 0.3) 0%, transparent 45%),
              radial-gradient(ellipse 60% 40% at 70% 90%, rgba(16, 185, 129, 0.35) 0%, transparent 40%),
              radial-gradient(ellipse 90% 45% at 10% 70%, rgba(52, 211, 153, 0.25) 0%, transparent 50%)
            `,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-transparent opacity-40" />
      </div>

      <GrainOverlay />

      <Container className="relative z-10 pt-32 md:pt-36 lg:pt-40 pb-32 md:pb-36 lg:pb-40">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-16 lg:gap-20 items-center">
          <div>
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/80">
                Now Available
              </span>
            </div>

            {/* Heading — each word wrapped for stagger animation */}
            <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white tracking-[-0.04em] leading-[1.0]">
              {'Empowering Your'.split(' ').map((word, i) => (
                <span key={i} className="hero-title-word inline-block mr-[0.25em]">{word}</span>
              ))}
              <br className="hidden sm:block" />
              {'Business with'.split(' ').map((word, i) => (
                <span key={`b${i}`} className="hero-title-word inline-block mr-[0.25em]">{word}</span>
              ))}
              <span className="hero-title-word inline-block italic font-light mr-[0.25em]">Smarter</span>
              <br className="hidden sm:block" />
              <span className="hero-title-word inline-block italic font-light">Digital Solutions</span>
            </h1>

            {/* Subheadline */}
            <p className="hero-desc mt-6 text-xl md:text-2xl lg:text-2xl text-white/70 leading-relaxed font-light max-w-2xl">
              At Hargrave Labs, we combine cutting-edge AI automation with expert web development to help your business scale efficiently and thrive.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-10">
              <motion.a
                href="#services"
                onClick={(e) => { e.preventDefault(); scrollTo('#services'); }}
                className="hero-cta inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black text-sm font-medium"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Learn More About Our Services
                <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </motion.a>
            </div>
          </div>

          {/* Stat cards */}
          <div className="flex flex-row md:flex-col gap-4 md:min-w-[240px] lg:min-w-[280px]">
            {[
              { value: '10x', desc: 'Faster design iterations with AI-assisted automation.', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z' },
              { value: '100+', desc: 'Production-ready projects delivered across industries.', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="hero-stat rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10 p-6"
                whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-4xl font-semibold text-white tracking-tight">{stat.value}</span>
                  <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                </div>
                <p className="text-sm text-white/40 mt-2 font-light leading-snug">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
