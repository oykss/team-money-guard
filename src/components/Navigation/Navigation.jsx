import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { IoMdHome } from 'react-icons/io';
import { MdAttachMoney } from 'react-icons/md';
import { SlGraph } from 'react-icons/sl';

import { ROUTES } from '../../constants';
import { useMediaPoints } from '../../hooks/useMediaPoints';
import css from './Navigation.module.css';

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, 'btn-pr-effect', isActive && css.activeLink);
  };

  const { isMobile } = useMediaPoints();

  return (
    <div className={css.container}>
      <nav className={css.nav}>
        <NavLink to={ROUTES.HOME} className={buildLinkClass}>
          <IoMdHome className={css.icon} />
          {!isMobile && <span className={css.span}>Home</span>}
        </NavLink>
        <NavLink to={ROUTES.STATISTICS} className={buildLinkClass}>
          <SlGraph className={css.icon} />
          {!isMobile && <span className={css.span}>Statistics</span>}
        </NavLink>
        {isMobile && (
          <NavLink to={ROUTES.CURRENCY} className={buildLinkClass}>
            <MdAttachMoney className={css.icon} />
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
