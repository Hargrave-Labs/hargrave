import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '../hooks/useGSAP';
import { Container } from '../components/ui/Container';
import { GrainOverlay } from '../components/ui/GrainOverlay';
import { AuroraShader } from '../components/ui/AuroraShader';
import { scrollToSection } from '../lib/utils';

const serif = "'Instrument Serif', 'Times New Roman', Georgia, serif";

const HEADLINE_SENTENCE = 'We build the software and automation your business runs on.';

function formatCityTime(timeZone: string) {
  return new Intl.DateTimeFormat('en-AU', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());
}

function useDualCityClock() {
  const [times, setTimes] = useState(() => ({
    perth: formatCityTime('Australia/Perth'),
    melbourne: formatCityTime('Australia/Melbourne'),
  }));

  useEffect(() => {
    const id = setInterval(() => {
      setTimes({
        perth: formatCityTime('Australia/Perth'),
        melbourne: formatCityTime('Australia/Melbourne'),
      });
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  return times;
}

interface HeroProps {
  /** True once the intro overlay's curtain lift has started (or immediately on repeat visits). */
  introReady: boolean;
}

export default function Hero({ introReady }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const { perth, melbourne } = useDualCityClock();

  useGSAP(() => {
    if (!ref.current) return;

    if (!introReady) {
      // Hold everything in its pre-reveal state until the intro hands off.
      // (Only runs when motion is not reduced — see useGSAP, which skips
      // this callback entirely under prefers-reduced-motion, so those users
      // never have their content hidden.)
      gsap.set('.hero-eyebrow', { y: 10, opacity: 0 });
      gsap.set('.hero-line', { yPercent: 110 });
      gsap.set('.hero-sub', { y: 14, opacity: 0 });
      gsap.set('.hero-cta', { y: 10, opacity: 0 });
      gsap.set('.hero-meta > *', { y: 8, opacity: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.from('.hero-eyebrow', { y: 10, opacity: 0, duration: 0.45, delay: 0 })
      .from('.hero-line', { yPercent: 110, duration: 0.85, ease: 'expo.out', stagger: 0.07 }, '-=0.25')
      .from('.hero-sub', { y: 14, opacity: 0, duration: 0.48 }, '-=0.38')
      .from('.hero-cta', { y: 10, opacity: 0, duration: 0.42, stagger: 0.07 }, '-=0.33')
      .from('.hero-meta > *', { y: 8, opacity: 0, duration: 0.35, stagger: 0.07 }, '-=0.3');
  }, [introReady], ref);

  // Magnetic CTA: nudge the primary pill toward the cursor on fine-pointer/hover devices.
  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const MAX_OFFSET = 6;
    const xTo = gsap.quickTo(cta, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(cta, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMove = (e: MouseEvent) => {
      const rect = cta.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(gsap.utils.clamp(-MAX_OFFSET, MAX_OFFSET, relX * 0.4));
      yTo(gsap.utils.clamp(-MAX_OFFSET, MAX_OFFSET, relY * 0.4));
    };

    const handleLeave = () => {
      gsap.to(cta, { x: 0, y: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
    };

    cta.addEventListener('mousemove', handleMove);
    cta.addEventListener('mouseleave', handleLeave);

    return () => {
      cta.removeEventListener('mousemove', handleMove);
      cta.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[calc(100vh-2rem)] flex flex-col overflow-hidden rounded-[2.5rem] mx-4 mt-4 mb-4 bg-[#080a09]"
      style={{ WebkitTransform: 'translateZ(0)', colorScheme: 'dark' }}
    >
      {/* Living background: dark CSS base (fallback if WebGL is unavailable),
          the WebGL aurora shader, a legibility scrim, then filmic grain. */}
      <div className="absolute inset-0" style={{ WebkitTransform: 'translateZ(0)' }}>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#060706_0%,#0a0c0b_60%,#080a09_100%)]" />
        {/* Only spin up the hero's WebGL context once the intro has handed off,
            so the intro and hero never hold two contexts at the same time
            (fewer contexts = lighter GPU load and no context-limit exhaustion).
            The dark gradient above covers this space while the intro is up. */}
        {introReady && <AuroraShader className="z-[1]" />}
        {/* Legibility scrim: a dark pool anchored top-left (radial) plus a
            diagonal falloff (linear), stacked so the headline/subhead zone
            (~left 55% / top 70%) reads as near-black no matter how bright
            the aurora gets underneath, while the right/bottom stay clear. */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              'radial-gradient(85% 75% at 8% 12%, rgba(4,6,5,0.72) 0%, rgba(4,6,5,0.44) 40%, rgba(4,6,5,0) 68%), ' +
              'linear-gradient(120deg, rgba(4,6,5,0.7) 0%, rgba(4,6,5,0.38) 34%, rgba(4,6,5,0) 60%)',
          }}
        />
      </div>

      <GrainOverlay />

      <Container className="relative z-10 flex flex-1 flex-col justify-center pt-36 md:pt-40 pb-16 md:pb-20 w-full">
        <div>
          {/* Factual meta, not a badge */}
          <p className="hero-eyebrow text-[11px] font-medium tracking-[0.28em] uppercase text-white/45">
            AI Systems
            <span className="mx-2.5 text-emerald-400/70">/</span>
            Web Product Engineering
          </p>

          {/* Editorial serif headline — full width, masked line reveal, controlled breaks per breakpoint */}
          <h1
            className="hero-title mt-7 md:mt-8 font-normal text-[#f4f5f2] text-[2.6rem] sm:text-[3.4rem] md:text-[clamp(2.8rem,7.2vw,7.3rem)] leading-[1.03]"
            style={{ fontFamily: serif, letterSpacing: '-0.018em' }}
            aria-label={HEADLINE_SENTENCE}
          >
            {/* Desktop (md+): two lines, second line indented */}
            <span className="hidden md:block" aria-hidden="true">
              <span className="block overflow-hidden">
                <span className="hero-line inline-block whitespace-nowrap">
                  We build the software and automation
                </span>
              </span>
              <span className="block overflow-hidden md:ml-[1em]">
                <span className="hero-line inline-block whitespace-nowrap">
                  your business runs on<span className="text-emerald-300/90">.</span>
                </span>
              </span>
            </span>

            {/* Mobile (below md): three lines, flush left */}
            <span className="md:hidden" aria-hidden="true">
              <span className="block overflow-hidden">
                <span className="hero-line inline-block whitespace-nowrap">We build the software</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line inline-block whitespace-nowrap">and automation your</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line inline-block whitespace-nowrap">
                  business runs on<span className="text-emerald-300/90">.</span>
                </span>
              </span>
            </span>
          </h1>

          {/* Concrete subhead with a point of view, capped ~60ch */}
          <p className="hero-sub mt-8 max-w-xl text-lg md:text-xl leading-relaxed font-light text-white/60">
            Hargrave Labs is an AI automation and web engineering studio. We design,
            build, and ship production systems that make small teams move like large ones.
          </p>

          {/* One decisive action, one quiet link */}
          <div className="hero-cta flex flex-wrap items-center gap-x-8 gap-y-4 mt-11">
            <a
              ref={ctaRef}
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
              className="inline-flex items-center rounded-full bg-[#f4f5f2] text-[#0a0b0a] text-[0.9rem] font-medium px-7 py-3.5 hover:bg-white active:!scale-[0.97]"
            >
              Book a consult
            </a>
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); scrollToSection('#services'); }}
              className="group inline-flex items-center gap-2 text-[0.9rem] font-medium text-white/70 hover:text-white"
            >
              See our capabilities
              <span className="transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </Container>

      {/* Baseline hairline: quiet studio credibility + live dual-city clock, fills the space with restraint */}
      <Container className="relative z-10 pb-9 md:pb-11 w-full">
        <div className="hero-meta flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-10 border-t border-white/[0.08] pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
            <span className="text-[11px] font-medium tracking-[0.28em] uppercase text-white/35">
              Available for select projects
            </span>
            <div className="hidden sm:block h-3.5 w-px bg-white/10" />
            <span className="text-sm font-light text-white/40">
              Automation platforms, internal tools, and bespoke web products.
            </span>
          </div>
          <span className="text-[11px] font-medium tracking-[0.28em] uppercase text-white/35 tabular-nums">
            PERTH {perth}
            <span className="mx-1.5 text-white/20">·</span>
            MELBOURNE {melbourne}
          </span>
        </div>
      </Container>
    </section>
  );
}
