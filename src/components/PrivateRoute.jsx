import { Navigate, Outlet } from 'react-router-dom';
import useAuthStatus from '../hooks/useAuthStatus';
import Spinner from './Spinner';

// Private Route component to only render children if logged in/authenticated
// Outlet component renders all children
const PrivateRoute = () => {
  const { loggedIn, loading } = useAuthStatus();

  if (loading) {
    return <Spinner />;
  }
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
};
export default PrivateRoute;
