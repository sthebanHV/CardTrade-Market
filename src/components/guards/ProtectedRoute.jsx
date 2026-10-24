import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store';

export const ProtectedRoute = ({ children }) => {
  const token = useStore((s) => s.token);
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
};
