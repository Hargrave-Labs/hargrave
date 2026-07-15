import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Home from './pages/Home';
import { isPortalHost } from './portal/routes';

const PortalApp = lazy(() => import('./portal/PortalApp'));

const portalFallback = (
  <div style={{
    minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: '#050706', color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, system-ui, sans-serif',
  }}>Loading…</div>
);

// On the app subdomain the portal lives at the root, so an old /portal/* link should
// redirect to its root equivalent (e.g. /portal/new → /new, /portal → /).
function StripPortalPrefix() {
  const loc = useLocation();
  const rest = loc.pathname.replace(/^\/portal/, '');
  return <Navigate to={`${rest || '/'}${loc.search}`} replace />;
}

function App() {
  // app.hargravelabs.com: the portal IS the site, mounted at the root.
  if (isPortalHost) {
    return (
      <BrowserRouter>
        <Suspense fallback={portalFallback}>
          <Routes>
            <Route path="/portal/*" element={<StripPortalPrefix />} />
            <Route path="/*" element={<PortalApp />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
  }

  // Marketing domain (and localhost): marketing at /, portal under /portal.
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portal/*" element={<Suspense fallback={portalFallback}><PortalApp /></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
