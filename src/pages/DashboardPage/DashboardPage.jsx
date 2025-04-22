import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import { currentUser } from '../../store/auth/operations';
import Balance from '../../components/Balance/Balance';

export default function DashboardPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCurrentUser() {
      await dispatch(currentUser());
    }
    fetchCurrentUser();
  }, [dispatch]);
  return (
    <>
      <Header />
      <Navigation />
      <Balance />
      <Outlet />
    </>
  );
}
