import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';

export default function DashboardPage() {
  return (
    <>
      <Header />
      <Navigation />
      <Outlet />
    </>
  );
}
