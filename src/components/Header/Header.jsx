import { useState } from 'react';
import { IoExitOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logoSvg from '../../assets/logo.svg';
import { selectUser } from '../../store/auth/selectors';
import Container from '../../ui/Container/Container';
import ModalLogout from '../ModalLogout/ModalLogout';
import { ROUTES } from './../../constants/index';
import { useMediaPoints } from './../../hooks/useMediaPoints';
import css from './Header.module.css';

export default function Header() {
  const { isMobile } = useMediaPoints();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(selectUser);

  return (
    <>
      <header className={css.header}>
        <Container className={css.container}>
          <Link to={ROUTES.HOME} className="btn-pr-effect">
            <img src={logoSvg} alt="Logo" />
          </Link>

          <div className={css.infoWrap}>
            <p className={css.name}>{user.name}</p>
            <button
              type="button"
              className="btn-pr-effect"
              onClick={() => setIsOpen(prev => !prev)}
            >
              <IoExitOutline color="#ffffff99" size={24} />
              {!isMobile && <p>Exit</p>}
            </button>
          </div>
        </Container>
      </header>

      {isOpen && <ModalLogout closeMenu={() => setIsOpen(false)} />}
    </>
  );
}
