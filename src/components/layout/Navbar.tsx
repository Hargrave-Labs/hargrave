import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { navLinks, siteConfig } from '../../config/site';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [onDark, setOnDark] = useState(true);
  const navRef = useRef<HTMLElement>(null);

  // Sample the element behind the navbar center to detect dark vs light
  const detectBackground = useCallback(() => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Temporarily hide nav so elementFromPoint hits the content behind it
    navRef.current.style.pointerEvents = 'none';
    const navContainer = navRef.current.closest('.fixed') as HTMLElement | null;
    if (navContainer) navContainer.style.pointerEvents = 'none';

    const el = document.elementFromPoint(x, y);

    navRef.current.style.pointerEvents = '';
    if (navContainer) navContainer.style.pointerEvents = '';

    if (!el) return;

    // Walk up to find the nearest section-level element with a background
    let target: HTMLElement | null = el as HTMLElement;
    while (target && target !== document.body) {
      const bg = getComputedStyle(target).backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        // Parse rgb values
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          const luminance = (parseInt(match[1]) * 299 + parseInt(match[2]) * 587 + parseInt(match[3]) * 114) / 1000;
          setOnDark(luminance < 128);
        }
        return;
      }
      target = target.parentElement;
    }
    // Default to light (white page background)
    setOnDark(false);
  }, []);

  useEffect(() => {
    detectBackground();
    window.addEventListener('scroll', detectBackground, { passive: true });
    window.addEventListener('resize', detectBackground, { passive: true });
    return () => {
      window.removeEventListener('scroll', detectBackground);
      window.removeEventListener('resize', detectBackground);
    };
  }, [detectBackground]);

  // Track active section
  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    }
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-8 px-6">
        <nav
          ref={navRef}
          className={cn(
            'w-full max-w-[1600px] rounded-full transition-all duration-500 p-[1.5px] backdrop-blur-xl -translate-y-[120px] opacity-0',
            onDark
              ? 'bg-white/[0.12] border border-white/[0.18] shadow-lg shadow-black/20'
              : 'bg-white/70 border border-zinc-200/80 shadow-lg shadow-black/[0.08]'
          )}
        >
          <div className="px-6 lg:px-8">
            <div className="flex h-14 items-center justify-between">
              <a
                href="#home"
                onClick={(e) => { e.preventDefault(); scrollTo('#home'); }}
                className={cn(
                  'text-lg font-semibold tracking-[-0.03em] transition-colors duration-500',
                  onDark ? 'text-white' : 'text-zinc-900'
                )}
              >
                {siteConfig.name}
              </a>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className={cn(
                      'text-sm tracking-wide transition-all duration-500 px-4 py-2 rounded-full',
                      onDark
                        ? activeSection === link.href
                          ? 'text-white bg-white/10'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                        : activeSection === link.href
                          ? 'text-zinc-900 bg-zinc-900/[0.06]'
                          : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-900/[0.06]'
                    )}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                  className={cn(
                    'ml-3 px-5 py-2 text-sm font-medium rounded-full transition-all duration-500',
                    onDark
                      ? 'bg-white text-zinc-900 hover:bg-zinc-100'
                      : 'bg-zinc-900 text-white hover:bg-zinc-800'
                  )}
                >
                  Get in Touch
                </a>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
                aria-label="Toggle menu"
              >
                <span className={cn(
                  'block w-6 h-px transition-all duration-500',
                  onDark ? 'bg-white' : 'bg-zinc-900',
                  mobileOpen && 'rotate-45 translate-y-[3.5px]'
                )} />
                <span className={cn(
                  'block w-6 h-px transition-all duration-500',
                  onDark ? 'bg-white' : 'bg-zinc-900',
                  mobileOpen && '-rotate-45 -translate-y-[3.5px]'
                )} />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className={cn(
                      'text-2xl font-light tracking-wide transition-colors',
                      activeSection === link.href ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-900'
                    )}
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
