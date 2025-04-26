import clsx from 'clsx';
import Loader from '../Loader/Loader';
import css from './LoadingBtn.module.css';

export default function LoadingBtn({
  children,
  isLoading,
  click,
  type = 'button',
  className,
  size,
}) {
  return (
    <button
      type={type}
      className={clsx(css.btn, className, isLoading ? '' : 'btn-pr-effect')}
      disabled={isLoading}
      onClick={click}
    >
      {isLoading ? <Loader size={size} /> : children}
    </button>
  );
}
