import { Navigate } from 'react-router-dom';
import { useStore } from '../../store';
import { ForbiddenPage } from '../ui/ForbiddenPage';

export const AdminRoute = ({ children }) => {
  const token = useStore((s) => s.token);
  const role = useStore((s) => s.user?.role);
  if (!token) return <Navigate to="/login" replace />;
  if (role !== 'ROLE_ADMIN') return <ForbiddenPage />;
  return children;
};
