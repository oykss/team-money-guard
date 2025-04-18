import { Navigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useMediaPoints } from '../hooks/useMediaPoints';

export const MediaRoute = ({ component: Component, redirectTo = ROUTES.HOME }) => {
  const { isMobile } = useMediaPoints();

  return isMobile ? Component : <Navigate to={redirectTo} replace />;
};
