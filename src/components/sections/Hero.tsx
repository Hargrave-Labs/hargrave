import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useGSAP } from '../../hooks/useGSAP';
import { Button } from '../ui/Button';
import { GrainOverlay } from '../ui/GrainOverlay';

gsap.registerPlugin(ScrollTrigger);

function GlassStatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="w-full p-5 bg-white/5 backdrop-blur-[12px] border border-white/10 rounded-2xl">
      <div className="text-3xl font-bold text-white tracking-[-0.03em]">{value}</div>
      <div className="text-sm text-white/60 mt-1 font-light">{label}</div>
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-label', { y: 20, opacity: 0, duration: 0.6, delay: 0.3 })
      .from('.hero-title-line', { y: 80, opacity: 0, duration: 1, stagger: 0.15 }, '-=0.3')
      .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
      .from('.hero-cta', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
      .from('.hero-stats', { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.3');

    gsap.to('.hero-content', {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }, [], containerRef);

  return (
    <section
      ref={containerRef}
      className="relative h-[92vh] flex items-center overflow-hidden rounded-b-[2.5rem] mx-2 mt-2"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/60 to-zinc-950/90" />
      </div>

      {/* Grain overlay */}
      <GrainOverlay />

      {/* Massive background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
        <span className="text-[22vw] font-bold text-white/[0.03] tracking-[-0.05em] select-none blur-[2px] leading-none">
          HARGRAVE
        </span>
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 mx-auto max-w-[1600px] px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left: Text content */}
          <div className="lg:col-span-3">
            {/* Label */}
            <div className="hero-label">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-[12px] mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs text-white/80 tracking-wider uppercase font-medium">
                  Now Accepting Projects for 2026
                </span>
              </motion.div>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.05em] leading-[1.05]">
              <span className="hero-title-line block gradient-text">
                We Build the Future
              </span>
              <span className="hero-title-line block text-white/60 mt-2 lg:mt-4">
                With Intelligence
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle mt-8 text-lg lg:text-xl text-white/60 max-w-xl leading-relaxed font-light">
              Hargrave Labs delivers premium AI automation and bespoke digital
              experiences for businesses that refuse to settle for ordinary.
            </p>

            {/* CTAs */}
            <div className="hero-cta flex flex-col sm:flex-row items-start gap-4 mt-10">
              <Button href="/contact" size="lg">
                Start a Project
              </Button>
              <Button href="/portfolio" variant="secondary" size="lg">
                View Our Work
              </Button>
            </div>
          </div>

          {/* Right: Glass stat cards */}
          <div className="lg:col-span-2 hidden lg:flex flex-col gap-4">
            {[
              { value: '50+', label: 'Projects Delivered' },
              { value: '98%', label: 'Client Retention' },
              { value: '2x', label: 'Avg. ROI Increase' },
              { value: '24/7', label: 'Ongoing Support' },
            ].map((stat) => (
              <div key={stat.label} className="hero-stats">
                <GlassStatCard value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile stats */}
        <div className="lg:hidden mt-12 grid grid-cols-2 gap-3">
          {[
            { value: '50+', label: 'Projects Delivered' },
            { value: '98%', label: 'Client Retention' },
            { value: '2x', label: 'Avg. ROI Increase' },
            { value: '24/7', label: 'Ongoing Support' },
          ].map((stat) => (
            <div key={stat.label} className="hero-stats">
              <GlassStatCard value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
