# Hargrave Labs

Premium website for Hargrave Labs — AI Automation & Digital Excellence.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 8
- **Styling:** Tailwind CSS 4
- **Animations:** GSAP (ScrollTrigger) + Framer Motion
- **Routing:** React Router v7

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Pages

- **Home** — Hero section with GSAP parallax, services preview, portfolio preview, value proposition
- **About** — Company story, approach, core values
- **Services** — AI Automation & Website Design/Development with process overview
- **Portfolio** — Selected project showcases
- **Contact** — Contact form (Web3Forms integration), company info

## Project Structure

```
src/
├── components/
│   ├── layout/     # Navbar, Footer, Layout, PageTransition
│   ├── ui/         # Button, Card, Container, Input, SectionHeading
│   └── sections/   # Hero, CTABanner
├── pages/          # Home, About, Services, Portfolio, Contact
├── hooks/          # useGSAP (GSAP + React 18 cleanup)
├── data/           # Services, projects content
├── config/         # Site metadata, navigation
├── lib/            # Utilities, animation defaults
└── types/          # TypeScript interfaces
```

## Configuration

- **Contact form:** Replace `YOUR_ACCESS_KEY_HERE` in `src/pages/Contact.tsx` with your Web3Forms access key
- **Site metadata:** Edit `src/config/site.ts` for company info, nav links, etc.
- **Content:** Edit files in `src/data/` to update services and portfolio projects

## Design

- Dark, sophisticated palette (deep blacks, grays, muted stone accents)
- GSAP scroll-triggered animations for content reveals and parallax
- Framer Motion for page transitions and micro-interactions
- Mobile-first responsive design (375px to 1440px+)
- Premium typography with Inter font family
