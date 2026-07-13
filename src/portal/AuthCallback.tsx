import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const ran = useRef(false);

  useEffect(() => {
    // The PKCE code is single-use. React StrictMode invokes effects twice in dev,
    // which would exchange the code a second time and fail — so run exactly once.
    if (ran.current) return;
    ran.current = true;

    (async () => {
      const params = new URLSearchParams(window.location.search);
      const errDesc = params.get('error_description');
      if (errDesc) {
        setError(errDesc);
        return;
      }

      const code = params.get('code');
      if (!code) {
        setError('Missing sign-in code. Please request a new link.');
        return;
      }

      const { error: exErr } = await supabase.auth.exchangeCodeForSession(code);
      if (!exErr) {
        navigate('/portal', { replace: true });
        return;
      }

      // The exchange failed — but a prior attempt may already have established the
      // session. If one exists, proceed; otherwise surface the error.
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/portal', { replace: true });
      } else {
        setError('Your sign-in link is invalid or has expired. Please request a new one.');
      }
    })();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050706] px-6 text-center text-white">
      {error ? (
        <div className="space-y-3">
          <p className="text-brand-200">{error}</p>
          <a href="/portal/login" className="text-emerald-400 hover:text-emerald-300">Back to sign in</a>
        </div>
      ) : (
        <div className="flex items-center gap-3 text-brand-400">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-emerald-400" />
          Signing you in…
        </div>
      )}
    </div>
  );
}
