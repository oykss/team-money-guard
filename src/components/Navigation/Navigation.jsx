import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { IoMdHome } from 'react-icons/io';
import { MdAttachMoney } from 'react-icons/md';
import { SlGraph } from 'react-icons/sl';

import { ROUTES } from '../../constants';
import { useMediaPoints } from '../../hooks/useMediaPoints';
import Container from '../../ui/Container/Container';
import s from './Navigation.module.css';

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, 'btn-pr-effect', isActive && s.activeLink);
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
