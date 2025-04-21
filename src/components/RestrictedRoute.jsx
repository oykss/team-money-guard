import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { selectIsLoggedIn } from '../store/auth/selectors';

export const RestrictedRoute = ({ component: Component, redirectTo = ROUTES.HOME }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} replace /> : Component;
};
