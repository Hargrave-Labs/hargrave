import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useGSAP } from '../hooks/useGSAP';
import { Container } from '../components/ui/Container';
import { GrainOverlay } from '../components/ui/GrainOverlay';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: '01', title: 'Discovery & Strategy', desc: 'Deep-dive into your business to map goals, audiences, and opportunities.' },
  { num: '02', title: 'Design & Prototype', desc: 'Pixel-perfect UI and interactive prototypes you can feel before we build.' },
  { num: '03', title: 'Build & Automate', desc: 'Production-grade code paired with AI workflows that scale on day one.' },
  { num: '04', title: 'Launch & Optimise', desc: 'Ship confidently, then iterate with real-time analytics and testing.' },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1023px)');
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Disable parallax on mobile — the visual is hidden anyway (lg:block)
  const visualY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [80, -80]);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        fastScrollEnd: true,
      },
    });
    tl.from('.srv-label', { y: 20, opacity: 0, duration: 0.5 })
      .from('.srv-title', { y: 30, opacity: 0, duration: 0.8 }, '-=0.2')
      .from('.srv-desc', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
      .from('.srv-step', { y: 25, opacity: 0, duration: 0.6, stagger: isMobile ? 0.06 : 0.12 }, '-=0.2');
  }, [isMobile], sectionRef);

  return (
    <section id="services" ref={sectionRef} className="relative section-dark py-24 lg:py-36 my-2">
      <GrainOverlay />

      {/* Subtle background image */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      }} />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left — text + steps */}
          <div>
            <p className="srv-label label-style mb-4">Productivity Engine</p>
            <h2 className="srv-title text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-[-0.04em] leading-[1.05]">
              Built for the future of
              <br />
              product development.
            </h2>
            <p className="srv-desc mt-6 text-white/50 leading-relaxed font-light text-lg max-w-lg">
              Hargrave Labs integrates seamlessly into your existing workflow, acting as
              a force multiplier for your team. What used to take weeks now happens in
              real-time during your standup.
            </p>

            {/* Numbered steps */}
            <div className="mt-12 space-y-6">
              {steps.map((step) => (
                <motion.div
                  key={step.num}
                  className="srv-step flex items-start gap-4 group"
                  whileHover={isMobile ? undefined : { x: 6 }}
                  whileTap={isMobile ? { scale: 0.98 } : undefined}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="flex items-center justify-center w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border border-white/10 text-sm font-semibold text-white/60 shrink-0 group-hover:border-emerald-400/40 group-hover:text-emerald-400 transition-colors duration-300">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{step.title}</h3>
                    <p className="text-white/40 text-sm font-light mt-0.5">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Efficiency callout */}
            <motion.div
              className="srv-step mt-10 p-5 rounded-2xl bg-white/[0.04] border border-white/10 max-w-sm"
              whileHover={{ borderColor: 'rgba(52, 211, 153, 0.3)' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-emerald-400 text-xs font-semibold tracking-wide">Efficiency Gain</span>
              </div>
              <p className="text-white/40 text-sm font-light leading-relaxed">
                Teams using our approach report a 60% reduction in iteration time,
                allowing designers to focus on strategic user experience problems.
              </p>
            </motion.div>
          </div>

          {/* Right — floating visual */}
          <motion.div style={{ y: visualY }} ref={visualRef} className="relative hidden lg:block">
            <div className="rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 p-1 shadow-2xl shadow-black/40">
              <div className="rounded-[1.35rem] bg-zinc-900 p-6 overflow-hidden">
                {/* Fake dashboard wireframe */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/10" />
                  <div className="flex-1">
                    <div className="h-2.5 rounded bg-white/10 w-32" />
                    <div className="h-2 rounded bg-white/5 w-20 mt-1.5" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="h-28 rounded-xl bg-white/[0.04] border border-white/5" />
                  <div className="h-28 rounded-xl bg-white/[0.04] border border-white/5" />
                </div>
                <div className="h-36 rounded-xl bg-white/[0.04] border border-white/5 mb-4" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-16 rounded-xl bg-white/[0.04] border border-white/5" />
                  <div className="h-16 rounded-xl bg-white/[0.04] border border-white/5" />
                  <div className="h-16 rounded-xl bg-white/[0.04] border border-white/5" />
                </div>
              </div>
            </div>

            {/* Floating "Code Exported" badge */}
            <motion.div
              className="absolute -bottom-4 -right-4 flex items-center gap-2 px-5 py-3 rounded-full bg-white shadow-xl shadow-black/10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-zinc-900">Code Exported</span>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
