import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants';
import {
  selectIsRefreshing,
  selectToken,
  selectTokenTimestamp,
  selectWasLogout,
} from '../../store/auth/selectors';
import { setLoggedIn } from '../../store/auth/slice';
import BackdropApp from '../../ui/BackdropApp/BackdropApp';
import { setAuthToken } from '../../utils/setAuthToken';
import { MediaRoute } from '../MediaRoutes';
import { PrivateRoute } from '../PrivateRoute';
import { RestrictedRoute } from '../RestrictedRoute';
import { currentUser } from './../../store/auth/operations';

const DashboardPage = lazy(() => import('../../pages/DashboardPage/DashboardPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage/RegisterPage'));
const CurrencyTab = lazy(() => import('../CurrencyTab/CurrencyTab'));
const HomeTab = lazy(() => import('../HomeTab/HomeTab'));
const StatisticsTab = lazy(() => import('../StatisticsTab/StatisticsTab'));

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const tokenTimestamp = useSelector(selectTokenTimestamp);
  const token = useSelector(selectToken);
  const wasLogout = useSelector(selectWasLogout);

  useEffect(() => {
    if (token && tokenTimestamp > Date.now()) {
      setAuthToken(token);
      dispatch(setLoggedIn(true));
      return;
    }

    if (!wasLogout) dispatch(currentUser());
  }, [dispatch, token, tokenTimestamp, wasLogout]);

  return isRefreshing ? (
    <BackdropApp />
  ) : (
    <Suspense fallback={<BackdropApp />}>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={<PrivateRoute component={<DashboardPage />} />}
        >
          <Route index element={<HomeTab />} />
          <Route path={ROUTES.STATISTICS} element={<StatisticsTab />} />
          <Route
            path={ROUTES.CURRENCY}
            element={<MediaRoute component={<CurrencyTab />} />}
          />
        </Route>

        <Route
          path={ROUTES.REGISTER}
          element={<RestrictedRoute component={<RegisterPage />} />}
        />
        <Route
          path={ROUTES.LOGIN}
          element={<RestrictedRoute component={<LoginPage />} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
