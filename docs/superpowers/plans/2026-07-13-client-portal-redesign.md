# Client Portal — Redesign on the new Hargrave Labs site

**Context:** The portal was originally built on the *old* site (plain JS, hand-CSS,
purple/blue). The site has since been rebuilt (TS + Tailwind 4, emerald accent,
single-page, Cloudflare Worker). This plan ports the portal onto the new site,
reusing the **backend and product decisions** but rebuilding the **entire UI** in
TypeScript + Tailwind against the new design system.

Product decisions are unchanged — see
`docs/superpowers/specs/2026-07-13-hgl-client-portal-cr-design.md` (magic-link auth,
invite-only, CR fields: title/description/type/page_url/acceptance_criteria +
attachments, no priority, statuses submitted→…→completed + needs_info/declined).

## What's reused vs rebuilt

- **Reused as-is:** `supabase/migrations/0001_init_portal.sql` (already applied to
  the live Supabase project); all product/UX decisions; magic-link PKCE flow;
  code-split + `noindex` SEO approach.
- **Rebuilt:** every portal component, in `.tsx` with Tailwind, reusing the new
  design system (`ui/Button`, `ui/Input`, `ui/Card`, `ui/Container`, `cn`,
  `siteConfig`) and the dark-glass + **emerald** aesthetic.

## Design direction (approved)

Dark portal: near-black `#050706` background, glass cards, white text, **emerald**
accents — exactly what the new site's `ui/` primitives target. Login entry points:
Footer link + a small "Already a client? Log in" line in the CTA banner.

## Stack integration

- **Routing (new):** the site had none. Add `react-router-dom` v7. `src/App.tsx`
  becomes a `<BrowserRouter>`: `/` → `src/pages/Home.tsx` (the current marketing
  shell, moved verbatim), `/portal/*` → lazy `src/portal/PortalApp.tsx`. Lazy import
  keeps Supabase out of the marketing bundle.
- **SPA deep links:** already handled — `wrangler.jsonc` has
  `assets.not_found_handling: "single-page-application"`. No `_redirects` needed.
- **Env:** Supabase vars added to `.env.example` and typed in `src/vite-env.d.ts`
  (strict TS requires the declaration). `.env` already holds the live values.
- **TS constraints:** `verbatimModuleSyntax` (use `import type`), `erasableSyntaxOnly`
  (no `enum` — use union types + const objects), `noUnusedLocals/Parameters`.

## File map (new, under `src/portal/` unless noted)

| File | Responsibility |
|---|---|
| `src/App.tsx` (rewrite) | BrowserRouter: `/` Home, `/portal/*` lazy PortalApp |
| `src/pages/Home.tsx` (new) | The current marketing shell (Intro/Navbar/sections/Footer) |
| `lib/supabaseClient.ts` | Configured Supabase singleton (PKCE, detectSessionInUrl:false) |
| `types.ts` | `RequestType`, `CrStatus` unions; `Profile`/`ChangeRequest`/`Attachment` |
| `constants.ts` | `REQUEST_TYPES`, `STATUS_META` (Tailwind class per status), file limits, `PRIMARY_BTN` |
| `useNoindex.ts` | Inject `noindex` meta while portal mounted |
| `AuthProvider.tsx` | Session context + `useAuth` + `signOut` |
| `ProtectedRoute.tsx` | Redirect to `/portal/login` when no session |
| `useRequests.ts` | `useProfile`, `useRequests`, `useRequest` (typed) |
| `PortalApp.tsx` | Lazy entry: AuthProvider + nested portal routes + `useNoindex` |
| `PortalLoading.tsx` | Shared dark loading screen |
| `PortalLayout.tsx` | Dark shell: header (brand + company + sign out) + `<Outlet/>` |
| `StatusChip.tsx` | Emerald-family status pill |
| `Login.tsx` | Magic-link form (reuses `ui/Input`) |
| `AuthCallback.tsx` | Exchange PKCE code → session → redirect |
| `RequestList.tsx` | Glass cards of the client's CRs |
| `NewRequestForm.tsx` | Reuses `ui/Input`+`Textarea`, styled select + file upload |
| `RequestDetail.tsx` | Read-only CR + signed-URL attachments |
| `components/layout/Footer.tsx` (edit) | Add "Client Login" link |
| `components/sections/CTABanner.tsx` (edit) | Add subtle "Already a client? Log in" |
| `src/vite-env.d.ts` (edit) | Add Supabase env var types |
| `.env.example` (edit) | Add Supabase vars |

## Verification

`npm run build` (runs `tsc -b` then vite build — strict TS must pass) and
`npm run lint`. Confirm code-split: Supabase absent from the marketing chunk.
Runtime magic-link flow tested against the live Supabase project.

## Deploy (unchanged plan)

`app.hargravelabs.com` on the same Cloudflare Worker (add custom domain). Supabase
Auth: Site URL + redirect allowlist include localhost and the subdomain
`/portal/auth/callback`.
