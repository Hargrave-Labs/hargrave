import { useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '../hooks/useGSAP';
import { Container } from '../components/ui/Container';
import { Input, Textarea } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { GrainOverlay } from '../components/ui/GrainOverlay';
import { siteConfig } from '../config/site';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    if (!ref.current) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.contact-label', { y: 20, opacity: 0, duration: 0.6, delay: 0.2 })
      .from('.contact-title', { y: 20, opacity: 0, duration: 0.9 }, '-=0.3')
      .from('.contact-desc', { y: 20, opacity: 0, duration: 0.7 }, '-=0.4')
      .from('.contact-content', { y: 20, opacity: 0, duration: 0.8 }, '-=0.3');
  }, [], ref);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="pt-32 lg:pt-40 pb-20 lg:pb-28 relative section-dark">
        <GrainOverlay />
        <Container className="max-w-4xl text-center relative z-10">
          <p className="contact-label label-style mb-4">
            Get in Touch
          </p>
          <h1 className="contact-title text-4xl sm:text-5xl lg:text-6xl font-semibold gradient-text text-balance tracking-[-0.05em] leading-[1.05]">
            Let's Start a Conversation
          </h1>
          <p className="contact-desc mt-8 text-lg lg:text-xl text-brand-400 leading-relaxed max-w-2xl mx-auto font-light">
            Ready to elevate your digital presence? Tell us about your project
            and we'll get back to you within 24 hours.
          </p>
        </Container>
      </section>

      {/* Form + Info */}
      <section className="pb-24 lg:pb-32 bg-brand-50 rounded-t-[2.5rem] mx-2">
        <Container className="pt-16 lg:pt-24">
          <div className="contact-content grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center shadow-sm">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 mb-2 tracking-[-0.02em]">
                    Message Sent
                  </h3>
                  <p className="text-zinc-500 font-light">
                    Thank you for reaching out. We'll be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Web3Forms access key — replace with your real key */}
                  <input
                    type="hidden"
                    name="access_key"
                    value="YOUR_ACCESS_KEY_HERE"
                  />
                  <input
                    type="hidden"
                    name="subject"
                    value="New enquiry from Hargrave Labs website"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm text-zinc-600 font-medium tracking-wide">Name</label>
                      <input
                        name="name"
                        placeholder="Your name"
                        required
                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm text-zinc-600 font-medium tracking-wide">Email</label>
                      <input
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        required
                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm text-zinc-600 font-medium tracking-wide">Company</label>
                    <input
                      name="company"
                      placeholder="Your company name"
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm text-zinc-600 font-medium tracking-wide">Project Type</label>
                    <input
                      name="project_type"
                      placeholder="AI Automation / Website / Both"
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm text-zinc-600 font-medium tracking-wide">Tell Us About Your Project</label>
                    <textarea
                      name="message"
                      placeholder="Share your vision, goals, and any specific requirements..."
                      required
                      rows={6}
                      className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-300 resize-none"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h3 className="label-style mb-4">
                  Email
                </h3>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-zinc-900 hover:text-emerald-600 transition-colors font-medium"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div>
                <h3 className="label-style mb-4">
                  Locations
                </h3>
                <div className="space-y-3 text-zinc-500 font-light">
                  <p>{siteConfig.locations.perth}</p>
                  <p>{siteConfig.locations.melbourne}</p>
                </div>
              </div>

              <div>
                <h3 className="label-style mb-4">
                  Response Time
                </h3>
                <p className="text-zinc-500 font-light">
                  We typically respond within 24 hours during business days.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                <h3 className="text-lg font-semibold text-zinc-900 mb-2 tracking-[-0.02em]">
                  Prefer a Call?
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed font-light">
                  Book a free 30-minute discovery call to discuss your project
                  in detail. No obligations, just a conversation about your
                  goals.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
