import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '../hooks/useGSAP';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTABanner } from '../components/sections/CTABanner';
import { GrainOverlay } from '../components/ui/GrainOverlay';

gsap.registerPlugin(ScrollTrigger);

function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.about-label', { y: 20, opacity: 0, duration: 0.6, delay: 0.2 })
      .from('.about-title', { y: 20, opacity: 0, duration: 0.9 }, '-=0.3')
      .from('.about-desc', { y: 20, opacity: 0, duration: 0.7 }, '-=0.4');
  }, [], ref);

  return (
    <section ref={ref} className="pt-32 lg:pt-40 pb-20 lg:pb-28 relative section-dark">
      <GrainOverlay />
      <Container className="max-w-4xl text-center relative z-10">
        <p className="about-label label-style mb-4">
          Our Story
        </p>
        <h1 className="about-title text-4xl sm:text-5xl lg:text-6xl font-semibold gradient-text text-balance tracking-[-0.05em] leading-[1.05]">
          Where AI Meets Artistry
        </h1>
        <p className="about-desc mt-8 text-lg lg:text-xl text-brand-400 leading-relaxed max-w-2xl mx-auto font-light">
          Hargrave Labs was founded on a simple belief: technology should be
          beautiful, intelligent, and transformative. We bring that vision to
          life for every client we serve.
        </p>
      </Container>
    </section>
  );
}

function Story() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll('.story-block'), {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    });
  }, [], ref);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-brand-50 rounded-[2.5rem] mx-2 my-2">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="story-block">
            <h2 className="text-2xl lg:text-3xl font-semibold text-zinc-900 mb-6 tracking-[-0.04em] leading-[1.05]">
              The Origin
            </h2>
            <div className="space-y-5 text-zinc-500 leading-relaxed font-light">
              <p>
                Born from a shared vision between Perth and Melbourne, Hargrave
                Labs emerged from the realisation that most businesses were
                getting one of two things — good technology or good design —
                but rarely both.
              </p>
              <p>
                Co-founded by Chris Patrick and Jasraj Bhasin, we set out to
                bridge that gap. Our approach marries the analytical precision
                of AI engineering with the creative sensibility of world-class
                design.
              </p>
              <p>
                The result? Digital solutions that are as intelligent as they
                are beautiful. Products that don't just work — they work
                exceptionally.
              </p>
            </div>
          </div>
          <div className="story-block">
            <h2 className="text-2xl lg:text-3xl font-semibold text-zinc-900 mb-6 tracking-[-0.04em] leading-[1.05]">
              Our Approach
            </h2>
            <div className="space-y-5 text-zinc-500 leading-relaxed font-light">
              <p>
                We don't do templates. We don't do cookie-cutter. Every project
                begins with deep discovery — understanding your business, your
                audience, and the outcomes that matter.
              </p>
              <p>
                From there, we craft bespoke solutions that are engineered to
                perform and designed to impress. Our process is iterative,
                transparent, and built on partnership.
              </p>
              <p>
                We measure success not by deliverables ticked off a list, but
                by the tangible impact on your business. That's why our clients
                stay, grow, and refer.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Values() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll('.value-card'), {
      y: 20,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    });
  }, [], ref);

  const values = [
    {
      title: 'Excellence as Standard',
      desc: 'Good enough never is. We hold ourselves to the highest standard in every line of code, every pixel, every decision.',
    },
    {
      title: 'Relentless Innovation',
      desc: "We stay at the frontier of AI and web technology so our clients benefit from what's next — not what's comfortable.",
    },
    {
      title: 'Radical Transparency',
      desc: 'No smoke and mirrors. Clear communication, honest timelines, and full visibility into our process.',
    },
    {
      title: 'Partnership Over Projects',
      desc: "We build relationships, not just deliverables. Your success is our success, and we're in it for the long run.",
    },
    {
      title: 'Precision in Craft',
      desc: 'Details matter. From spacing to performance to user experience, nothing is overlooked.',
    },
    {
      title: 'Impact-Driven',
      desc: 'Every decision we make is guided by one question: does this create real, measurable value for our client?',
    },
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32 relative section-dark">
      <GrainOverlay />
      <Container className="relative z-10">
        <SectionHeading
          label="Our Values"
          title="What Drives Us"
          description="These aren't words on a wall — they're the principles that shape every project."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="value-card p-6 lg:p-8 rounded-2xl glass-card hover:bg-white/[0.08] transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-white mb-3 tracking-[-0.02em]">
                {v.title}
              </h3>
              <p className="text-sm text-brand-400 leading-relaxed font-light">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function About() {
  return (
    <>
      <AboutHero />
      <Story />
      <Values />
      <CTABanner
        title="Ready to Work With Us?"
        description="Let's discuss how Hargrave Labs can elevate your digital presence."
      />
    </>
  );
}
