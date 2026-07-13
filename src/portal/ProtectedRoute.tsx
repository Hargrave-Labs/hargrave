import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from './AuthProvider';
import PortalLoading from './PortalLoading';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) return <PortalLoading />;
  if (!session) return <Navigate to="/portal/login" replace state={{ from: location }} />;
  return <>{children}</>;
}
