import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useGSAP } from '../hooks/useGSAP';
import { HeroParallax } from '../components/ui/hero-parallax';
import { CTABanner } from '../components/sections/CTABanner';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { GrainOverlay } from '../components/ui/GrainOverlay';
import { services } from '../data/services';
import { projects } from '../data/projects';

const portfolioProducts = [
  {
    title: 'AI Automation Platform',
    link: '#',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
  },
  {
    title: 'Neural Network Dashboard',
    link: '#',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop',
  },
  {
    title: 'Smart Analytics Suite',
    link: '#',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
  },
  {
    title: 'Cloud Infrastructure',
    link: '#',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
  },
  {
    title: 'Data Visualization Engine',
    link: '#',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
  },
  {
    title: 'Enterprise Web Portal',
    link: '#',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop',
  },
  {
    title: 'Machine Learning Pipeline',
    link: '#',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop',
  },
  {
    title: 'Digital Workspace',
    link: '#',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop',
  },
  {
    title: 'Responsive Design System',
    link: '#',
    thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&auto=format&fit=crop',
  },
  {
    title: 'API Gateway Platform',
    link: '#',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop',
  },
  {
    title: 'Blockchain Integration',
    link: '#',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop',
  },
  {
    title: 'Cybersecurity Dashboard',
    link: '#',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop',
  },
  {
    title: 'IoT Control Center',
    link: '#',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop',
  },
  {
    title: 'SaaS Product Design',
    link: '#',
    thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop',
  },
  {
    title: 'Modern Dev Environment',
    link: '#',
    thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop',
  },
];

gsap.registerPlugin(ScrollTrigger);

function ServicesPreview() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll('.service-card'), {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    });
  }, [], ref);

  return (
    <section ref={ref} className="py-24 lg:py-32 relative section-dark">
      <GrainOverlay />
      <Container className="relative z-10">
        <SectionHeading
          label="What We Do"
          title="Precision-Crafted Solutions"
          description="We combine AI intelligence with design excellence to deliver transformative results."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <Card key={service.id} className="service-card group">
              <div className="text-3xl mb-6">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3 tracking-[-0.03em]">
                {service.title}
              </h3>
              <p className="text-brand-400 text-sm leading-relaxed mb-6 font-light">
                {service.description}
              </p>
              <Link
                to="/services"
                className="inline-flex items-center text-sm text-emerald-400/80 group-hover:text-emerald-400 transition-colors duration-300 font-medium"
              >
                Learn more
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PortfolioPreview() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll('.project-card'), {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    });
  }, [], ref);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-brand-50 relative rounded-[2.5rem] mx-2 my-2">
      <Container>
        <SectionHeading
          label="Selected Work"
          title="Projects That Speak Volumes"
          description="A glimpse of the premium digital experiences we've crafted for our clients."
          className="[&_h2]:text-zinc-900 [&_p]:text-zinc-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden hover:border-zinc-300 hover:shadow-xl transition-all duration-300">
                {/* Image placeholder */}
                <div className="aspect-[16/10] bg-zinc-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-zinc-400 text-sm tracking-wider uppercase font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-zinc-900 tracking-[-0.02em]">
                      {project.title}
                    </h3>
                    <span className="text-xs text-zinc-400">{project.year}</span>
                  </div>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-4 font-light">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button href="/portfolio" variant="secondary" className="!bg-zinc-900 !text-white !border-zinc-900 hover:!bg-zinc-800">
            View All Projects
          </Button>
        </div>
      </Container>
    </section>
  );
}

function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll('.why-item'), {
      y: 20,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    });
  }, [], ref);

  const reasons = [
    {
      title: 'Dual Expertise',
      desc: 'AI automation and web development under one roof. No fragmented agencies, no handoff friction.',
    },
    {
      title: 'Premium Craft',
      desc: 'Every pixel, every algorithm, every interaction is considered and refined to perfection.',
    },
    {
      title: 'Strategic Partnership',
      desc: "We don't just build — we advise, iterate, and grow with your business long-term.",
    },
    {
      title: 'Australian Quality',
      desc: 'Based in Perth and Melbourne, delivering world-class standards with local accountability.',
    },
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32 relative section-dark">
      <GrainOverlay />
      <Container className="relative z-10">
        <SectionHeading
          label="Why Hargrave Labs"
          title="Built Different"
          description="We're not another agency. We're your competitive advantage."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {reasons.map((r) => (
            <div key={r.title} className="why-item p-6 lg:p-8 rounded-2xl glass-card hover:bg-white/[0.08] transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-2 tracking-[-0.02em]">{r.title}</h3>
              <p className="text-sm text-brand-400 leading-relaxed font-light">{r.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroParallax products={portfolioProducts} />
      <ServicesPreview />
      <PortfolioPreview />
      <WhyUs />
      <CTABanner />
    </>
  );
}
