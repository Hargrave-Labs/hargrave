import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Home from './pages/Home';

const PortalApp = lazy(() => import('./portal/PortalApp'));

const portalFallback = (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#050706',
      color: 'rgba(255,255,255,0.6)',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}
  >
    Loading…
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/portal/*"
          element={<Suspense fallback={portalFallback}><PortalApp /></Suspense>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
