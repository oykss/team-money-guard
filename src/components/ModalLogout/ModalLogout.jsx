import { useDispatch } from 'react-redux';
import logoSvg from '../../assets/logo.svg';
import { logOut } from '../../store/auth/operations';
import Modal from '../../ui/Modal/Modal';
import { useMediaPoints } from './../../hooks/useMediaPoints';
import css from './ModalLogout.module.css';

export default function ModalLogout({ closeMenu }) {
  const { isMobile } = useMediaPoints();
  const dispatch = useDispatch();

  return (
    <Modal closeFn={closeMenu} className={css.modal}>
      {!isMobile && (
        <img src={logoSvg} alt="Logo" className={css.logo} width={182} height={75} />
      )}
      <p className={css.text}>Are you sure you want to log out?</p>
      <button type="button" className={css.logoutBtn} onClick={() => dispatch(logOut())}>
        Logout
      </button>
      <button type="button" onClick={closeMenu} className={css.cancelBtn}>
        cancel
      </button>
    </Modal>
  );
}
