import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants';
import { selectIsLoggedIn } from '../store/auth/selectors';

export const RestrictedRoute = ({ component: Component, redirectTo = ROUTES.HOME }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  const targetRedirect = location.state?.from?.pathname || redirectTo;

  return isLoggedIn ? <Navigate to={targetRedirect} replace /> : Component;
};
