import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants';
import { selectIsLoggedIn } from '../store/auth/selectors';

export const PrivateRoute = ({ component: Component, redirectTo = ROUTES.LOGIN }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  const targetRedirect = location.state?.from?.pathname || redirectTo;

  return isLoggedIn ? (
    Component
  ) : (
    <Navigate to={targetRedirect} state={{ from: location }} replace />
  );
};
