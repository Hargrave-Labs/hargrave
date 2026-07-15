// The portal is the whole site on the app subdomain (served at the root); on any
// other host (the marketing domain, localhost) it lives under /portal.
const APP_HOSTS = ['app.hargravelabs.com'];

export const isPortalHost = APP_HOSTS.includes(window.location.hostname);

// '' on the app subdomain (root), '/portal' everywhere else.
export const PORTAL_BASE = isPortalHost ? '' : '/portal';

// Build an in-app path to a portal route, e.g. portalPath('/login') or portalPath().
export function portalPath(sub = ''): string {
  const path = `${PORTAL_BASE}${sub}`;
  return path === '' ? '/' : path;
}

// The canonical URL clients use to reach the portal — for links on the marketing
// site. Points at the subdomain in production, stays local during development.
export const CANONICAL_PORTAL_URL = 'https://app.hargravelabs.com';

export function portalEntryHref(): string {
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') return '/portal/login';
  return CANONICAL_PORTAL_URL;
}
