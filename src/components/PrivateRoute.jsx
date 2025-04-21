import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { selectIsLoggedIn } from '../store/auth/selectors';

export const PrivateRoute = ({ component: Component, redirectTo = ROUTES.LOGIN }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? Component : <Navigate to={redirectTo} replace />;
};
