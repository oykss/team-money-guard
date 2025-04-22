import { useDispatch, useSelector } from 'react-redux';
import logoSvg from '../../assets/logo.svg';

import clsx from 'clsx';
import { logOut } from '../../store/auth/operations';
import { selectIsLoading } from '../../store/auth/selectors';
import LoadingBtn from '../../ui/LoadingBtn/LoadingBtn';
import Modal from '../../ui/Modal/Modal';
import { useMediaPoints } from './../../hooks/useMediaPoints';
import css from './ModalLogout.module.css';

export default function ModalLogout({ closeMenu }) {
  const { isMobile } = useMediaPoints();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  return (
    <Modal closeFn={closeMenu} className={css.modal}>
      {!isMobile && (
        <img src={logoSvg} alt="Logo" className={css.logo} width={182} height={75} />
      )}
      <p className={css.text}>Are you sure you want to log out?</p>

      <LoadingBtn
        isLoading={isLoading}
        className={css.logoutBtn}
        click={() => dispatch(logOut())}
      >
        Logout
      </LoadingBtn>
      <button
        type="button"
        onClick={closeMenu}
        className={clsx(css.cancelBtn, 'btn-pr-effect')}
      >
        cancel
      </button>
    </Modal>
  );
}
