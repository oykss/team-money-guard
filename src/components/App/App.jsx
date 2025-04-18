import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants';
import DashboardPage from '../../pages/DashboardPage/DashboardPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import BackdropApp from '../../ui/BackdropApp/BackdropApp';
import CurrencyTab from '../CurrencyTab/CurrencyTab';
import HomeTab from '../HomeTab/HomeTab';
import { MediaRoute } from '../MediaRoutes';
import StatisticsTab from '../StatisticsTab/StatisticsTab';

export default function App() {
  // const dispatch = useDispatch();
  // const isRefreshing = useSelector(selectIsRefreshing);

  // useEffect(() => {
  //   dispatch(refreshUser());
  // }, [dispatch]);

  return (
    <>
      <Suspense fallback={<BackdropApp />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<DashboardPage />}>
            <Route index element={<HomeTab />} />
            <Route path={ROUTES.STATISTICS} element={<StatisticsTab />} />
            <Route
              path={ROUTES.CURRENCY}
              element={<MediaRoute component={<CurrencyTab />} />}
            />
          </Route>

          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
