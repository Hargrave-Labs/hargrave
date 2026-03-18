import { useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { useGSAP } from '../hooks/useGSAP';
import { Container } from '../components/ui/Container';
import { siteConfig } from '../config/site';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

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
    const data = new FormData(e.currentTarget);
    try {
      await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  const inputClass =
    'w-full bg-transparent border-b border-zinc-200 px-0 py-3 text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 transition-colors duration-300';
  const labelClass = 'block text-[10px] font-bold tracking-[0.15em] uppercase text-zinc-400 mb-1';

  return (
    <section id="contact" ref={ref} className="py-24 lg:py-36 bg-[#f5f5f7] rounded-[2.5rem] mx-4 my-2 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — info */}
          <div>
            <span className="contact-anim inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 px-3 py-1.5 rounded-full border border-zinc-300 mb-6">
              Contact Sales
            </span>
            <h2 className="contact-anim text-3xl sm:text-4xl lg:text-5xl font-semibold text-zinc-900 tracking-[-0.04em] leading-[1.05]">
              Get in touch
            </h2>
            <p className="contact-anim mt-6 text-zinc-500 leading-relaxed font-light text-lg max-w-md">
              Have a project in mind or questions about our services? Our team is
              ready to help you build something exceptional.
            </p>

            <div className="contact-anim mt-12 space-y-8">
              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="w-12 h-12 rounded-2xl bg-zinc-200/80 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs text-zinc-400 font-light">Email Support</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-zinc-900 font-medium hover:text-emerald-600 transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="w-12 h-12 rounded-2xl bg-zinc-200/80 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs text-zinc-400 font-light">Schedule Demo</p>
                  <p className="text-zinc-900 font-medium">Book a 15-min call</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-anim">
            {submitted ? (
              <motion.div
                className="flex flex-col items-center justify-center h-full text-center py-16"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">Message Sent</h3>
                <p className="text-zinc-500 font-light">We'll be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <input type="hidden" name="access_key" value="87c30b6d-7ab7-48b0-942d-89535f0216ed" />
                <input type="hidden" name="subject" value="New enquiry from Hargrave Labs website" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>First Name</label>
                    <input name="first_name" placeholder="John" required className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input name="last_name" placeholder="Smith" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Work Email</label>
                  <input name="email" type="email" placeholder="john.smith@company.com" required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Company Size</label>
                  <select name="company_size" className={`${inputClass} appearance-none cursor-pointer`} defaultValue="">
                    <option value="" disabled>Select...</option>
                    <option>1-10 employees</option>
                    <option>11-50 employees</option>
                    <option>51-200 employees</option>
                    <option>200+ employees</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project..."
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-zinc-900 text-white py-4 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Request Access
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
