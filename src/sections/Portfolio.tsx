import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useGSAP } from '../hooks/useGSAP';
import { Container } from '../components/ui/Container';
import { GrainOverlay } from '../components/ui/GrainOverlay';
import { ContainerScroll } from '../components/ui/container-scroll-animation';
import { getPortfolioProjects, type PortfolioProject } from '../lib/sanity';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Retention' },
  { value: '34%', label: 'Avg. Cost Reduction' },
  { value: '< 48h', label: 'Response Time' },
];

export default function Portfolio() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPortfolioProjects()
      .then(setProjects)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useGSAP(() => {
    if (!headerRef.current) return;
    gsap.from(headerRef.current.querySelectorAll('.port-anim'), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
    });
  }, [], headerRef);

  return (
    <section id="portfolio">
      {/* Header on white background */}
      <div ref={headerRef} className="py-20 lg:py-28">
        <Container className="text-center">
          <p className="port-anim label-style mb-4">Selected Work</p>
          <h2 className="port-anim text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-900 tracking-[-0.04em] leading-[1.05] text-balance">
            Projects that speak for themselves.
          </h2>
          <p className="port-anim mt-5 text-zinc-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            A curated selection of work that showcases our commitment to craft, innovation,
            and measurable results.
          </p>
        </Container>
      </div>

      {/* Showcase — dark section */}
      <div className="relative section-dark py-8">
        <GrainOverlay />
        <div className="relative z-10">
          {loading && (
            <div className="flex justify-center py-32">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            </div>
          )}
          {!loading && projects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <p className="text-white/50 text-lg font-light">New work coming soon.</p>
            </div>
          )}
          {projects.map((project) => (
            <a
              key={project._id}
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <ContainerScroll
                titleComponent={
                  <>
                    <h3 className="text-3xl lg:text-4xl font-semibold text-white tracking-[-0.04em] leading-[1.05]">
                      {project.title}
                    </h3>
                    <p className="text-lg text-white/55 mt-3 font-light">{project.description}</p>
                  </>
                }
              >
                <iframe
                  src={project.websiteUrl}
                  title={project.title}
                  className="h-full w-full rounded-2xl pointer-events-none"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
              </ContainerScroll>
            </a>
          ))}
        </div>
      </div>

      {/* Stats bar — light */}
      <div className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: '-50px' }}
              >
                <span className="text-4xl lg:text-5xl font-semibold text-zinc-900 tracking-tight">{stat.value}</span>
                <p className="text-sm text-zinc-400 mt-2 font-light">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
