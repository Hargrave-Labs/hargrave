import { useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '../hooks/useGSAP';
import { Container } from '../components/ui/Container';
import { GrainOverlay } from '../components/ui/GrainOverlay';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─────────────────────────────────────────────────────────── */

const webSteps = [
  { num: '01', title: 'Discovery & Strategy', desc: 'We audit your digital presence, map user journeys, and define measurable KPIs before a single pixel is placed.' },
  { num: '02', title: 'Design & Prototype', desc: 'Pixel-perfect UI with interactive prototypes you can click through — so you feel the product before we build it.' },
  { num: '03', title: 'Develop & Ship', desc: 'Production-grade React, Next.js, and headless CMS builds optimised for Core Web Vitals and SEO from day one.' },
  { num: '04', title: 'Launch & Optimise', desc: 'Ship confidently with CI/CD pipelines, then iterate using real-time analytics and A/B testing.' },
];

const aiSteps = [
  { num: '01', title: 'Workflow Audit', desc: "We identify the manual, repetitive tasks draining your team's time and map them to automation opportunities." },
  { num: '02', title: 'Solution Architecture', desc: 'Custom AI pipelines designed around your data — from document processing to intelligent customer routing.' },
  { num: '03', title: 'Build & Integrate', desc: 'Production-ready automation deployed into your existing stack — Slack, CRM, ERP, or bespoke internal tools.' },
  { num: '04', title: 'Monitor & Scale', desc: 'Continuous performance tracking with human-in-the-loop oversight, scaling workflows as your business grows.' },
];

const webContent = {
  label: 'Web Development',
  title: 'Bespoke websites that convert and scale.',
  desc: 'From high-converting landing pages to complex web applications, we build digital experiences that rank, engage, and drive revenue — engineered for performance from the ground up.',
  steps: webSteps,
  callout: {
    label: 'Performance First',
    text: 'Every site ships with 90+ Lighthouse scores, responsive design across all breakpoints, and SEO-ready architecture — no shortcuts.',
  },
};

const aiContent = {
  label: 'AI Automation',
  title: 'Intelligent automation that works while you sleep.',
  desc: 'We design and deploy AI-powered workflows that eliminate busywork, reduce errors, and free your team to focus on high-value decisions — not data entry.',
  steps: aiSteps,
  callout: {
    label: 'Proven Impact',
    text: 'Clients using our AI workflows report a 60% reduction in manual processing time and 3x faster response rates across customer-facing operations.',
  },
};

/* ─── Lazy-loaded wireframes (mobile perf) ─────────────────────────── */

const WebWireframeLazy = lazy(() =>
  Promise.resolve({ default: WebWireframe })
);
const AiWireframeLazy = lazy(() =>
  Promise.resolve({ default: AiWireframe })
);

/* ─── Sub-components ───────────────────────────────────────────────── */

function StepCard({
  step,
  isAI = false,
}: {
  step: { num: string; title: string; desc: string };
  isAI?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 group min-h-[44px]">
      <span className={`flex items-center justify-center w-9 h-9 min-w-[44px] min-h-[44px] rounded-full border text-xs font-semibold shrink-0 transition-[border-color,color,box-shadow] duration-200 ease-[var(--ease-out)] ${
        isAI
          ? 'border-emerald-500/20 text-emerald-400/70 group-hover:border-emerald-400/50 group-hover:text-emerald-400 group-hover:shadow-[0_0_12px_rgba(52,211,153,0.15)] active:border-emerald-400/50 active:text-emerald-400'
          : 'border-white/10 text-white/60 group-hover:border-emerald-400/40 group-hover:text-emerald-400 active:border-emerald-400/40 active:text-emerald-400'
      }`}>
        {step.num}
      </span>
      <div className="pt-[2px]">
        <h3 className="text-white font-semibold text-xs">{step.title}</h3>
        <p className="text-white/55 text-xs font-light mt-0.5 leading-relaxed">{step.desc}</p>
      </div>
    </div>
  );
}

function WebWireframe() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/[0.06] p-1 shadow-2xl shadow-black/40">
      <div className="rounded-[1.35rem] bg-zinc-900 p-6 overflow-hidden">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
          <div className="ml-3 h-5 flex-1 rounded-md bg-white/[0.06] max-w-[200px]" />
        </div>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-white/10" />
          <div className="flex-1 flex items-center gap-2">
            <div className="h-2 rounded bg-white/10 w-16" />
            <div className="h-2 rounded bg-white/[0.06] w-12" />
            <div className="h-2 rounded bg-white/[0.06] w-14" />
          </div>
          <div className="h-6 w-16 rounded-full bg-white/10" />
        </div>
        <div className="h-28 rounded-xl bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/5 mb-4 p-4 flex flex-col justify-end">
          <div className="h-3 rounded bg-white/10 w-3/4 mb-2" />
          <div className="h-2 rounded bg-white/[0.06] w-1/2" />
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-white/[0.03] border border-white/5 p-3 flex flex-col justify-between">
              <div className="h-2 rounded bg-white/10 w-8" />
              <div className="h-1.5 rounded bg-white/[0.06] w-full" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="h-24 rounded-xl bg-white/[0.03] border border-white/5" />
          <div className="h-24 rounded-xl bg-white/[0.03] border border-white/5" />
        </div>
      </div>
    </div>
  );
}

function AiWireframe() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-emerald-500/[0.08] p-1 shadow-2xl shadow-black/40">
      <div className="rounded-[1.35rem] bg-zinc-900 p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/55 uppercase tracking-wider">Pipeline Active</span>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Live</span>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Data Ingestion', status: 'complete' as const, width: '100%' },
            { label: 'AI Processing', status: 'active' as const, width: '72%' },
            { label: 'Quality Check', status: 'pending' as const, width: '0%' },
          ].map((node) => (
            <div key={node.label} className="rounded-xl bg-white/[0.04] border border-white/5 p-4">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs text-white/60 font-medium">{node.label}</span>
                <span className={`text-[10px] font-medium ${
                  node.status === 'complete' ? 'text-emerald-400' :
                  node.status === 'active' ? 'text-amber-400' : 'text-white/40'
                }`}>
                  {node.status === 'complete' ? 'Complete' : node.status === 'active' ? 'Running...' : 'Queued'}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-[width] duration-1000 ease-[var(--ease-in-out)] ${
                    node.status === 'complete' ? 'bg-emerald-400' :
                    node.status === 'active' ? 'bg-gradient-to-r from-emerald-400 to-amber-400' : 'bg-white/5'
                  }`}
                  style={{ width: node.width }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/10 p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Output Ready</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 rounded bg-emerald-400/10 w-full" />
            <div className="h-2 rounded bg-emerald-400/10 w-4/5" />
            <div className="h-2 rounded bg-emerald-400/10 w-3/5" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Card content layout ──────────────────────────────────────────── */

function CardContent({
  content,
  wireframe,
  isAI = false,
}: {
  content: typeof webContent;
  wireframe: React.ReactNode;
  isAI?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      <div>
        <p className="label-style mb-3">{content.label}</p>
        <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-semibold text-white tracking-[-0.04em] leading-[1.15]">
          {content.title}
        </h2>
        <p className="mt-4 text-white/60 leading-relaxed font-light text-sm max-w-lg">
          {content.desc}
        </p>

        <div className="mt-6 space-y-3.5">
          {content.steps.map((step) => (
            <StepCard key={step.num} step={step} isAI={isAI} />
          ))}
        </div>

        <div className={`mt-6 p-4 rounded-2xl max-w-sm ${
          isAI
            ? 'bg-emerald-500/[0.04] border border-emerald-500/10'
            : 'bg-white/[0.04] border border-white/10'
        }`}>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-emerald-400 text-xs font-semibold tracking-wide">{content.callout.label}</span>
          </div>
          <p className="text-white/55 text-xs font-light leading-relaxed">
            {content.callout.text}
          </p>
        </div>
      </div>

      <div className="hidden lg:block">
        <Suspense fallback={null}>
          {wireframe}
        </Suspense>
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────────── */

export default function ServicesCardPeel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const webCardRef = useRef<HTMLDivElement>(null);
  const aiCardRef = useRef<HTMLDivElement>(null);

  // Simple fade-in on scroll for all screen sizes
  useGSAP(() => {
    if (!webCardRef.current || !aiCardRef.current) return;

    gsap.from(webCardRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: webCardRef.current,
        start: 'top 80%',
        fastScrollEnd: true,
      },
    });
    gsap.from(aiCardRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: aiCardRef.current,
        start: 'top 80%',
        fastScrollEnd: true,
      },
    });
  }, [], sectionRef);

  return (
    <section id="services" ref={sectionRef} className="relative section-dark my-2">
      <div className="relative">
        <GrainOverlay />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-emerald-500/[0.03] rounded-full blur-[60px] lg:blur-[120px] pointer-events-none" />

        <Container className="relative z-10 py-16">
          {/* Section header */}
          <div className="text-center mb-8">
            <p className="label-style mb-4">Our Services</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-[-0.04em] leading-[1.05]">
              Two disciplines.<br />One seamless partner.
            </h2>
          </div>

          {/* Stacked cards */}
          <div className="space-y-6">
            <div
              ref={webCardRef}
              className="rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/[0.06] p-6 lg:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]"
            >
              <CardContent content={webContent} wireframe={<WebWireframeLazy />} />
            </div>

            <div
              ref={aiCardRef}
              className="rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/[0.06] p-6 lg:p-8 shadow-[0_0_80px_-20px_rgba(52,211,153,0.06)]"
            >
              <CardContent content={aiContent} wireframe={<AiWireframeLazy />} isAI />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
