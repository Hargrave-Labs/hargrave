import { useEffect } from 'react';

// Injects <meta name="robots" content="noindex, nofollow"> while a portal route is
// mounted, and removes it on unmount so marketing pages stay indexable.
export function useNoindex() {
  useEffect(() => {
    const tag = document.createElement('meta');
    tag.name = 'robots';
    tag.content = 'noindex, nofollow';
    document.head.appendChild(tag);
    return () => {
      document.head.removeChild(tag);
    };
  }, []);
}
