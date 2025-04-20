import Modal from '../../ui/Modal/Modal';
import { useMediaPoints } from './../../hooks/useMediaPoints';
import css from './ModalLogout.module.css';
import logoSvg from '../../assets/logo.svg';

export default function ModalLogout({ closeMenu }) {
  const { isMobile } = useMediaPoints();

  return (
    <Modal closeFn={closeMenu} className={css.modal}>
      {!isMobile && (
        <img src={logoSvg} alt="Logo" className={css.logo} width={182} height={75} />
      )}
      <p className={css.text}>Are you sure you want to log out?</p>
      <button type="button" className={css.logoutBtn}>
        Logout
      </button>
      <button type="button" onClick={closeMenu} className={css.cancelBtn}>
        cancel
      </button>
    </Modal>
  );
}
