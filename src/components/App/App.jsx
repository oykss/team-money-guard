import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { refresh } from '../../store/auth/operations';
import { selectIsRefreshing } from '../../store/auth/selectors';
import BackdropApp from '../../ui/BackdropApp/BackdropApp';
import { MediaRoute } from '../MediaRoutes';
import { PrivateRoute } from '../PrivateRoute';
import { RestrictedRoute } from '../RestrictedRoute';

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

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

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
