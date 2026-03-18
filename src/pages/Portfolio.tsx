import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useGSAP } from '../hooks/useGSAP';
import { Container } from '../components/ui/Container';
import { ContainerScroll } from '../components/ui/container-scroll-animation';
import { CTABanner } from '../components/sections/CTABanner';
import { GrainOverlay } from '../components/ui/GrainOverlay';
import { projects } from '../data/projects';
import mirariImg from '../assets/mirari.png';
import mtEntImg from '../assets/mt_ent.png';

gsap.registerPlugin(ScrollTrigger);

function PortfolioHero() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.port-badge', { y: 20, opacity: 0, duration: 0.5, delay: 0.2 })
      .from('.port-title', { y: 30, opacity: 0, duration: 0.9 }, '-=0.2')
      .from('.port-desc', { y: 20, opacity: 0, duration: 0.7 }, '-=0.4')
      .from('.port-cta', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
      .from('.port-stat', { y: 30, opacity: 0, duration: 0.6, stagger: 0.15 }, '-=0.4');
  }, [], ref);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#2d1b4e] to-[#0a0a0a]" />
        {/* Colorful wave overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[70%]"
          style={{
            background: `
              radial-gradient(ellipse 120% 60% at 20% 80%, rgba(6, 182, 212, 0.4) 0%, transparent 60%),
              radial-gradient(ellipse 100% 50% at 50% 70%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 80% 40% at 80% 60%, rgba(249, 115, 22, 0.25) 0%, transparent 50%),
              radial-gradient(ellipse 60% 30% at 30% 65%, rgba(234, 179, 8, 0.15) 0%, transparent 50%)
            `,
          }}
        />
        {/* Top fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-transparent opacity-60" />
      </div>

      <GrainOverlay />

      <Container className="relative z-10 pt-32 lg:pt-40 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-end">
          {/* Left content */}
          <div>
            {/* Badge */}
            <div className="port-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-white/80">
                Our Work
              </span>
            </div>

            {/* Heading */}
            <h1 className="port-title text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white tracking-[-0.04em] leading-[1.0]">
              Crafted for{' '}
              <span className="italic font-light">modern</span>
              <br />
              <span className="italic font-light">brands.</span>
            </h1>

            {/* Description */}
            <p className="port-desc mt-8 text-lg lg:text-xl text-white/50 leading-relaxed max-w-xl font-light">
              A curated selection of projects that showcase our commitment to
              excellence, innovation, and results-driven design.
            </p>

            {/* CTAs */}
            <div className="port-cta flex flex-wrap items-center gap-4 mt-10">
              <a
                href="#projects"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
              >
                View projects
                <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors backdrop-blur-sm"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right stat cards */}
          <div className="flex flex-col gap-4 lg:min-w-[260px]">
            <div className="port-stat rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10 p-6">
              <div className="flex items-start justify-between">
                <span className="text-4xl font-semibold text-white tracking-tight">50+</span>
                <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <p className="text-sm text-white/40 mt-2 font-light leading-snug">
                Projects delivered with pixel-perfect precision.
              </p>
            </div>

            <div className="port-stat rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10 p-6">
              <div className="flex items-start justify-between">
                <span className="text-4xl font-semibold text-white tracking-tight">100%</span>
                <svg className="w-5 h-5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-white/40 mt-2 font-light leading-snug">
                Client satisfaction across every engagement.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      y: 20,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
    });
  }, [], ref);

  const isReversed = index % 2 !== 0;

  return (
    <div ref={ref} className="py-12 lg:py-16">
      <Container>
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isReversed ? 'lg:direction-rtl' : ''
            }`}
        >
          {/* Image */}
          <motion.div
            className={`${isReversed ? 'lg:order-2' : ''}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="aspect-[16/10] rounded-2xl glass-card overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-brand-400 text-sm tracking-wider uppercase block font-medium">
                    {project.category}
                  </span>
                  <span className="text-brand-500 text-xs mt-2 block">
                    {project.year}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* Content */}
          <div className={`${isReversed ? 'lg:order-1' : ''}`}>
            <span className="label-style">
              {project.category}
            </span>
            <h2 className="text-2xl lg:text-3xl font-semibold text-white mt-3 mb-4 tracking-[-0.04em] leading-[1.05]">
              {project.title}
            </h2>
            <p className="text-brand-400 leading-relaxed mb-6 font-light">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-brand-400 border border-white/10 backdrop-blur-[12px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function PortfolioShowcase() {
  return (
    <div className="relative section-dark">
      <GrainOverlay />
      <div className="relative z-10">
        {/* Mirari Auto Detailing */}
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-4xl font-semibold text-white">
                Mirari Auto Detailing
              </h2>
              <p className="text-xl text-neutral-400 mt-4">
                Premium auto detailing website with sleek dark aesthetic and seamless booking experience
              </p>
            </>
          }
        >
          <img
            src={mirariImg}
            alt="Mirari Auto Detailing Website"
            className="mx-auto rounded-2xl object-cover h-full w-full object-top"
          />
        </ContainerScroll>

        {/* Website 1: MT Entertainment */}
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-4xl font-semibold text-white tracking-[-0.04em] leading-[1.05]">
                MT Entertainment
              </h2>
              <p className="text-xl text-brand-400 mt-4 font-light">
                Cinematic production company website with bold typography and elegant minimalism
              </p>
            </>
          }
        >
          <img
            src={mtEntImg}
            alt="MT Entertainment Website"
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>

        {/* Website 2: Modern SaaS Application */}
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-4xl font-semibold text-white tracking-[-0.04em] leading-[1.05]">
                Premium SaaS Platform
              </h2>
              <p className="text-xl text-brand-400 mt-4 font-light">
                Cutting-edge web application with seamless UX
              </p>
            </>
          }
        >
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400"
            alt="SaaS Platform Interface"
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <>
      <PortfolioHero />
      <PortfolioShowcase />
      <div className="relative section-dark">
        <GrainOverlay />
        <div className="relative z-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
      <CTABanner
        title="Want Results Like These?"
        description="Let's discuss how we can deliver the same calibre of work for your business."
      />
    </>
  );
}
