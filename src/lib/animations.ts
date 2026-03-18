export const FADE_UP = {
  y: 60,
  opacity: 0,
  duration: 0.9,
  ease: 'power3.out',
};

export const FADE_IN = {
  opacity: 0,
  duration: 0.8,
  ease: 'power2.out',
};

export const STAGGER = {
  each: 0.12,
  from: 'start' as const,
};

export const SCROLL_TRIGGER_DEFAULTS = {
  start: 'top 85%',
  toggleActions: 'play none none none' as const,
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};
