import { Link, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useProfile } from './useRequests';
import { siteConfig } from '../config/site';

export default function PortalLayout() {
  const { session, signOut } = useAuth();
  const profile = useProfile();

  return (
    <div className="min-h-screen bg-[#050706] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-500/[0.06] blur-[160px]" />
      </div>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#050706]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link to="/portal" className="text-sm font-semibold tracking-[-0.02em]">
            {siteConfig.name} <span className="text-emerald-400">Portal</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-brand-400 sm:inline">
              {profile?.company_name ?? session?.user?.email}
            </span>
            <button
              onClick={signOut}
              className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-brand-300 transition-colors hover:border-white/30 hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-10 lg:py-14">
        <Outlet />
      </main>
    </div>
  );
}
