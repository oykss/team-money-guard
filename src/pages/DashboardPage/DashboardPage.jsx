import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import { currentUser } from '../../store/auth/operations';
import css from './DashboardPage.module.css';

export default function DashboardPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCurrentUser() {
      dispatch(currentUser());
    }

    fetchCurrentUser();
  }, [dispatch]);
  return (
    <section className={css.section}>
      <Header />
      <Navigation />
      <Outlet />
    </section>
  );
}
