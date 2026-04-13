import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useGSAP } from '../hooks/useGSAP';
import { Container } from '../components/ui/Container';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  { icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z', label: 'AI Workflow Design' },
  { icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z', label: 'Rapid Prototyping' },
  { icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5', label: 'React & Next.js Export' },
  { icon: 'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z', label: 'Cloud-Native Delivery' },
  { icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z', label: 'Enterprise Security' },
  { icon: 'M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z', label: 'Performance Analytics' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll('.about-anim'), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    });
  }, [], sectionRef);

  useGSAP(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll('.cap-item'), {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current.querySelector('.cap-grid'), start: 'top 85%' },
    });
  }, [], sectionRef);

  return (
    <section id="about" ref={sectionRef} className="py-24 lg:py-36 bg-[#f5f5f7] rounded-[2.5rem] mx-4 my-2 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — text */}
          <div>
            <h2 className="about-anim text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-900 tracking-[-0.04em] leading-[1.05]">
              Where AI Expertise
              <br />
              Meets Development
              <br />
              Excellence
            </h2>
            <p className="about-anim mt-6 text-zinc-500 leading-relaxed font-light text-lg">
              Hargrave Labs brings the best of both worlds: innovative AI automation to optimise processes and expert web development to establish your online presence. With our specialised dual-focus approach, we provide your business with a single, trusted partner to elevate efficiency, engagement, and growth.
            </p>

            {/* Values / mission */}
            <div className="about-anim mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Efficiency', desc: 'Streamlined processes that save time and resources' },
                { label: 'Innovation', desc: 'Cutting-edge AI solutions tailored to your needs' },
                { label: 'Partnership', desc: 'A single trusted partner for your digital growth' },
              ].map((value) => (
                <div key={value.label} className="p-4 rounded-xl bg-zinc-100 border border-zinc-200">
                  <h4 className="text-sm font-semibold text-zinc-800">{value.label}</h4>
                  <p className="text-xs text-zinc-500 mt-1 font-light leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating dark visual card */}
          <motion.div ref={cardRef} style={{ y: cardY }} className="relative">
            <div className="rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-1 shadow-2xl shadow-black/20">
              <div className="rounded-[1.35rem] bg-zinc-900 p-6 lg:p-8 overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="space-y-4">
                  {/* Hero visual — emerald gradient */}
                  <div className="h-32 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-900/10 border border-emerald-500/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-transparent" />
                    <span className="text-emerald-300/70 text-sm tracking-wider uppercase relative z-10">Brand Analysis</span>
                  </div>
                  {/* Progress bars */}
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-white/55 uppercase tracking-wider">System Analysis</span>
                      <div className="flex gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 rounded-full bg-white/10 w-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300"
                          initial={{ width: 0 }}
                          whileInView={{ width: '78%' }}
                          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                          viewport={{ once: true }}
                        />
                      </div>
                      <div className="h-2 rounded-full bg-white/10 w-3/4 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400/80 to-teal-300"
                          initial={{ width: 0 }}
                          whileInView={{ width: '62%' }}
                          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Status bar */}
                  <motion.div
                    className="flex items-center gap-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/10 px-4 py-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">AI</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/50 font-semibold">UX</span>
                    </span>
                    <span className="text-white/60 text-sm">Generating 12 variants...</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Capability grid */}
        <div className="cap-grid grid grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 mt-20 lg:mt-28">
          {capabilities.map((cap) => (
            <div
              key={cap.label}
              className="cap-item flex items-center gap-3 py-3 transition-transform duration-200 ease-[var(--ease-out)] hover:translate-x-1"
            >
              <span className="w-10 h-10 rounded-xl bg-zinc-200/80 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={cap.icon} />
                </svg>
              </span>
              <span className="text-sm font-medium text-zinc-700">{cap.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
