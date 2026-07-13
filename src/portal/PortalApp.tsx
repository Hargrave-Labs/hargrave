import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import PortalLayout from './PortalLayout';
import Login from './Login';
import AuthCallback from './AuthCallback';
import RequestList from './RequestList';
import NewRequestForm from './NewRequestForm';
import RequestDetail from './RequestDetail';
import { useNoindex } from './useNoindex';

export default function PortalApp() {
  useNoindex(); // keep the whole /portal surface out of search indexes

  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="auth/callback" element={<AuthCallback />} />
        <Route element={<ProtectedRoute><PortalLayout /></ProtectedRoute>}>
          <Route index element={<RequestList />} />
          <Route path="new" element={<NewRequestForm />} />
          <Route path="requests/:id" element={<RequestDetail />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
