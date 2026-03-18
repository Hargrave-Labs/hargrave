import { siteConfig, navLinks } from '../../config/site';
import { GrainOverlay } from '../ui/GrainOverlay';

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function Footer() {
  return (
    <footer className="relative section-dark mb-2">
      <GrainOverlay />
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 tracking-[-0.03em]">
              {siteConfig.name}
            </h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-light">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h4 className="label-style mb-4">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-sm text-white/40 hover:text-white transition-colors duration-300 font-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-style mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-white/40 font-light">
              <li>{siteConfig.email}</li>
              <li>{siteConfig.locations.perth}</li>
              <li>{siteConfig.locations.melbourne}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Crafted with precision in Australia.
          </p>
        </div>
      </div>
    </footer>
  );
}
