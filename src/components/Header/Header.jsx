import { useState, useEffect } from 'react';
import { IoExitOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logoSvg from '../../assets/logo.svg';
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
} from '../../store/auth/selectors';
import { currentUser } from '../../store/auth/operations';
import Container from '../../ui/Container/Container';
import Skeleton from '../../ui/Skeleton/Skeleton';
import ModalUserUpdate from '../UserModal/UserModal.jsx';
import ModalLogout from '../ModalLogout/ModalLogout';
import { ROUTES } from './../../constants/index';
import { useMediaPoints } from './../../hooks/useMediaPoints';
import css from './Header.module.css';

export default function Header() {
  const { isMobile } = useMediaPoints();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    if (isLoggedIn && !isRefreshing) {
      dispatch(currentUser());
    }
  }, [dispatch, isLoggedIn, isRefreshing]);

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
              className="btn-update"
              onClick={() => setIsModalOpen(true)}
            >
              {user?.photo ? (
                <img src={user.photo} alt="User Avatar" className={css.userPhoto} />
              ) : user?.name ? (
                <span className={css.userLetter}>{user.name[0].toUpperCase()}</span>
              ) : (
                <Skeleton width="70px" height="24px" />
              )}
            </button>
            {isModalOpen && <ModalUserUpdate onClose={() => setIsModalOpen(false)} />}
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
