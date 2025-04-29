import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import CurrencyTab from '../../components/CurrencyTab/CurrencyTab';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import { useMediaPoints } from '../../hooks/useMediaPoints';
import { currentUser } from '../../store/auth/operations';
import { getCategories } from '../../store/categories/operations';
import css from './DashboardPage.module.css';
import Balance from '../../components/Balance/Balance';
import Container from '../../ui/Container/Container';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { isMobile } = useMediaPoints();

  useEffect(() => {
    dispatch(currentUser());
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <section className={css.section}>
      <Header />
      <div className={css.wrapper}>
        <Container className={css.container}>
          <div className={css.userBarContainer}>
            <div className={css.navAndBalCont}>
              <Navigation />
              {!isMobile && <Balance />}
            </div>
            {!isMobile && <CurrencyTab />}
          </div>
          <Outlet />
        </Container>
      </div>
    </section>
  );
}
