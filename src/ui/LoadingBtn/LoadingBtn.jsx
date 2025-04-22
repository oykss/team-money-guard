import clsx from 'clsx';
import Loader from '../Loader/Loader';
import css from './LoadingBtn.module.css';

export default function LoadingBtn({
  children,
  isLoading,
  click,
  type = 'button',
  className,
}) {
  return (
    <button
      type={type}
      className={clsx(css.btn, className)}
      disabled={isLoading}
      onClick={click}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
}
