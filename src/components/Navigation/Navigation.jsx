import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { IoMdHome } from 'react-icons/io';
import { SlGraph } from 'react-icons/sl';
import { MdAttachMoney } from 'react-icons/md';
import { FaDollarSign } from 'react-icons/fa6';

import s from './Navigation.module.css';
import { ROUTES } from '../../constants';
import { useMediaPoints } from '../../hooks/useMediaPoints';
import Container from '../../ui/Container/Container';

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };

  const { isMobile } = useMediaPoints();

  return (
    <div>
      <Container className={s.container}>
        <nav className={s.nav}>
          <NavLink to={ROUTES.HOME} className={buildLinkClass}>
            <IoMdHome className={s.icon} />
            {!isMobile && <span className={s.span}>Home</span>}
          </NavLink>
          <NavLink to={ROUTES.STATISTICS} className={buildLinkClass}>
            <SlGraph className={s.icon} />
            {!isMobile && <span className={s.span}>Statistics</span>}
          </NavLink>
          {isMobile && (
            <NavLink to={ROUTES.CURRENCY} className={buildLinkClass}>
              <MdAttachMoney className={s.icon} />
            </NavLink>
          )}
        </nav>
      </Container>
    </div>
  );
};

export default Navigation;
