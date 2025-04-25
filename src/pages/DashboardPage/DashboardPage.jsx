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
      <Navigation />
      {!isMobile && <CurrencyTab />}
      <Outlet />
    </section>
  );
}
