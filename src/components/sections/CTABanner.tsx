import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useGSAP } from '../../hooks/useGSAP';
import { Container } from '../ui/Container';
import { GrainOverlay } from '../ui/GrainOverlay';

gsap.registerPlugin(ScrollTrigger);

interface CTABannerProps {
  title?: string;
  description?: string;
}

export function CTABanner({
  title = "Let's Build Something Exceptional",
  description = "Ready to transform your business with AI automation or a world-class website? We'd love to hear from you.",
}: CTABannerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll('.cta-anim'), {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
    });
  }, [], ref);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="relative overflow-hidden rounded-[2.5rem] mx-4 my-2 py-24 lg:py-32 bg-black" style={{ colorScheme: 'dark' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black">
        <GrainOverlay />
      </div>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/[0.04] rounded-full blur-[150px]" />
      </div>

      <Container className="relative z-10 text-center">
        <h2 className="cta-anim text-3xl sm:text-4xl lg:text-5xl font-semibold text-white text-balance tracking-[-0.05em] leading-[1.05]">
          {title}
        </h2>
        <p className="cta-anim mt-5 text-white/40 text-lg max-w-xl mx-auto font-light">
          {description}
        </p>
        <div className="cta-anim mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black text-sm font-medium"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            Start a Conversation
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </motion.a>
          <motion.a
            href="#services"
            onClick={(e) => { e.preventDefault(); scrollTo('#services'); }}
            className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-medium backdrop-blur-sm"
            whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Services
          </motion.a>
        </div>
      </Container>
    </section>
  );
}
