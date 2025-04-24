import clsx from 'clsx';
import { useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useMediaPoints } from '../../hooks/useMediaPoints';
import Container from './../Container/Container';
import css from './Modal.module.css';

export default function Modal({ children, closeFn, className }) {
  const { isMobile } = useMediaPoints();

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        closeFn();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeFn]);

  return (
    <div className={css.overlay} onClick={closeFn}>
      <div className={clsx(css.modal, className)} onClick={e => e.stopPropagation()}>
        {!isMobile && (
          <button
            type="button"
            onClick={closeFn}
            className={clsx(css.closeBtn, 'btn-pr-effect')}
          >
            <IoCloseOutline size={32} />
          </button>
        )}
        {isMobile ? <Container>{children}</Container> : children}
      </div>
    </div>
  );
}
