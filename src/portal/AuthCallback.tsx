import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const errDesc = params.get('error_description');
      if (errDesc) {
        if (active) setError(errDesc);
        return;
      }

      const code = params.get('code');
      if (!code) {
        if (active) setError('Missing sign-in code. Please request a new link.');
        return;
      }

      const { error: exErr } = await supabase.auth.exchangeCodeForSession(code);
      if (!active) return;
      if (exErr) {
        setError('Your sign-in link is invalid or has expired.');
        return;
      }
      navigate('/portal', { replace: true });
    })();
    return () => {
      active = false;
    };
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
