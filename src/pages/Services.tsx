import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '../hooks/useGSAP';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CTABanner } from '../components/sections/CTABanner';
import { GrainOverlay } from '../components/ui/GrainOverlay';
import { services } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

function ServicesHero() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.srv-label', { y: 20, opacity: 0, duration: 0.6, delay: 0.2 })
      .from('.srv-title', { y: 20, opacity: 0, duration: 0.9 }, '-=0.3')
      .from('.srv-desc', { y: 20, opacity: 0, duration: 0.7 }, '-=0.4');
  }, [], ref);

  return (
    <section ref={ref} className="pt-32 lg:pt-40 pb-20 lg:pb-28 relative section-dark">
      <GrainOverlay />
      <Container className="max-w-4xl text-center relative z-10">
        <p className="srv-label label-style mb-4">
          Our Services
        </p>
        <h1 className="srv-title text-4xl sm:text-5xl lg:text-6xl font-semibold gradient-text text-balance tracking-[-0.05em] leading-[1.05]">
          Solutions That Transform
        </h1>
        <p className="srv-desc mt-8 text-lg lg:text-xl text-brand-400 leading-relaxed max-w-2xl mx-auto font-light">
          From intelligent automation to bespoke digital experiences, we deliver
          end-to-end solutions engineered for impact.
        </p>
      </Container>
    </section>
  );
}

function ServiceDetail({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll('.srv-detail'), {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    });
  }, [], ref);

  return (
    <section
      ref={ref}
      className={`py-24 lg:py-32 ${isEven ? 'bg-brand-50 rounded-[2.5rem] mx-2 my-2' : 'relative section-dark'}`}
    >
      {!isEven && <GrainOverlay />}
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <div className="srv-detail text-4xl mb-6">{service.icon}</div>
            <h2 className={`srv-detail text-3xl lg:text-4xl font-semibold mb-6 tracking-[-0.04em] leading-[1.05] ${isEven ? 'text-zinc-900' : 'text-white'}`}>
              {service.title}
            </h2>
            <p className={`srv-detail text-lg leading-relaxed font-light ${isEven ? 'text-zinc-500' : 'text-brand-400'}`}>
              {service.description}
            </p>
          </div>
          <div className="srv-detail">
            <h3 className="label-style mb-6">
              What's Included
            </h3>
            <ul className="space-y-4">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className={`flex items-start gap-3 ${isEven ? 'text-zinc-600' : 'text-brand-300'}`}
                >
                  <svg
                    className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm leading-relaxed font-light">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Process() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll('.process-step'), {
      y: 20,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    });
  }, [], ref);

  const steps = [
    {
      num: '01',
      title: 'Discovery',
      desc: 'We dive deep into your business, goals, and challenges to understand the full picture.',
    },
    {
      num: '02',
      title: 'Strategy',
      desc: 'We design a tailored approach, choosing the right tools and technologies for maximum impact.',
    },
    {
      num: '03',
      title: 'Build',
      desc: 'Our team brings the vision to life with meticulous attention to detail and quality.',
    },
    {
      num: '04',
      title: 'Refine & Launch',
      desc: 'Rigorous testing, client feedback, and final polish before a confident launch.',
    },
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32 relative section-dark">
      <GrainOverlay />
      <Container className="relative z-10">
        <SectionHeading
          label="Our Process"
          title="How We Work"
          description="A proven methodology refined over dozens of successful projects."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="process-step p-6 lg:p-8 rounded-2xl glass-card hover:bg-white/[0.08] transition-all duration-300"
            >
              <span className="text-2xl font-bold text-emerald-400 mb-4 block">
                {step.num}
              </span>
              <h3 className="text-lg font-semibold text-white mb-2 tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="text-sm text-brand-400 leading-relaxed font-light">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function Services() {
  return (
    <>
      <ServicesHero />
      {services.map((service, i) => (
        <ServiceDetail key={service.id} service={service} index={i} />
      ))}
      <Process />
      <CTABanner
        title="Ready to Get Started?"
        description="Tell us about your project and we'll craft the perfect solution."
      />
    </>
  );
}
