import { useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '../hooks/useGSAP';
import { Container } from '../components/ui/Container';
import { siteConfig } from '../config/site';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current.querySelectorAll('.contact-anim'), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 75%' },
    });
  }, [], ref);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    try {
      await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-transparent border-b border-zinc-200 px-0 py-3 text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-0 transition-[border-color] duration-200 ease-[var(--ease-out)]';
  const labelClass = 'block text-[11px] font-bold tracking-[0.15em] uppercase text-zinc-400 mb-1';

  return (
    <section id="contact" ref={ref} className="py-24 lg:py-36 bg-[#f5f5f7] rounded-[2.5rem] mx-4 my-2 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — info */}
          <div>
            <span className="contact-anim inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-400 px-3 py-1.5 rounded-full border border-zinc-300 mb-6">
              Get Started
            </span>
            <h2 className="contact-anim text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-900 tracking-[-0.04em] leading-[1.05]">
              Get in touch
            </h2>
            <p className="contact-anim mt-6 text-zinc-500 leading-relaxed font-light text-lg max-w-md">
              Have a project in mind or questions about our services? Our team is
              ready to help you build something exceptional.
            </p>

            <div className="contact-anim mt-12 space-y-8">
              <div className="flex items-center gap-4 transition-transform duration-200 ease-[var(--ease-out)] hover:translate-x-1">
                <span className="w-12 h-12 rounded-2xl bg-zinc-200/80 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs text-zinc-400 font-light">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-zinc-900 font-medium hover:text-emerald-600 transition-colors duration-200">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 transition-transform duration-200 ease-[var(--ease-out)] hover:translate-x-1">
                <span className="w-12 h-12 rounded-2xl bg-zinc-200/80 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs text-zinc-400 font-light">Schedule a Call</p>
                  <p className="text-zinc-900 font-medium">Book a 15-min intro</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-anim">
            {submitted ? (
              <div
                className="flex flex-col items-center justify-center h-full text-center py-16 animate-[fadeIn_500ms_var(--ease-out)_both]"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">Message Sent</h3>
                <p className="text-zinc-500 font-light">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <input type="hidden" name="access_key" value="87c30b6d-7ab7-48b0-942d-89535f0216ed" />
                <input type="hidden" name="subject" value="New enquiry from Hargrave Labs website" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="first_name" className={labelClass}>First Name</label>
                    <input id="first_name" name="first_name" placeholder="John" required className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="last_name" className={labelClass}>Last Name</label>
                    <input id="last_name" name="last_name" placeholder="Smith" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Work Email</label>
                  <input id="email" name="email" type="email" placeholder="john.smith@company.com" required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="company_size" className={labelClass}>Company Size</label>
                  <select id="company_size" name="company_size" className={`${inputClass} appearance-none cursor-pointer`} defaultValue="">
                    <option value="" disabled>Select...</option>
                    <option>1-10 employees</option>
                    <option>11-50 employees</option>
                    <option>51-200 employees</option>
                    <option>200+ employees</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className={labelClass}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..."
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white py-4 rounded-full text-sm font-medium transition-[transform,background-color,opacity] duration-150 ease-[var(--ease-out)] hover:bg-zinc-800 active:!scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:!scale-100"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
