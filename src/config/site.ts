interface NavLink {
  label: string;
  href: string;
}

export const siteConfig = {
  name: 'Hargrave Labs',
  tagline: 'AI Automation & Digital Excellence',
  description:
    'Premium AI automation solutions and bespoke website design for businesses that demand excellence.',
  email: 'hello@hargravelabs.com',
  phone: '+61 8 1234 5678',
  locations: {
    perth: 'Perth, Western Australia',
    melbourne: 'Melbourne, Victoria',
  },
};

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];
