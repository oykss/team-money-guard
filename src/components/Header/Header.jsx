import { useState } from 'react';
import { IoExitOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import logoSvg from '../../assets/logo.svg';
import Container from '../../ui/Container/Container';
import Avatar from '../Avatar/Avatar';
import ModalLogout from '../ModalLogout/ModalLogout';
import ModalPatchUser from '../ModalPatchUser/ModalPatchUser';
import { ROUTES } from './../../constants/index';
import { useMediaPoints } from './../../hooks/useMediaPoints';
import css from './Header.module.css';

export default function Header() {
  const { isMobile } = useMediaPoints();
  const [isOpenLogout, setIsOpenLogout] = useState(false);
  const [isOpenPatch, setIsOpenPatch] = useState(false);

  return (
    <>
      <header className={css.header}>
        <Container className={css.container}>
          <Link to={ROUTES.HOME} className="btn-pr-effect">
            <img src={logoSvg} alt="Logo" />
          </Link>

          <div className={css.infoWrap}>
            <button
              type="button"
              className="btn-pr-effect"
              onClick={() => setIsOpenPatch(prev => !prev)}
            >
              <Avatar className={css.avatarHeader} />
            </button>
            <button
              type="button"
              className="btn-pr-effect"
              onClick={() => setIsOpenLogout(prev => !prev)}
            >
              <IoExitOutline color="#ffffff99" size={24} />
              {!isMobile && <p>Exit</p>}
            </button>
          </div>
        </Container>
      </header>

      {isOpenLogout && <ModalLogout closeMenu={() => setIsOpenLogout(false)} />}
      {isOpenPatch && <ModalPatchUser closeMenu={() => setIsOpenPatch(false)} />}
    </>
  );
}
