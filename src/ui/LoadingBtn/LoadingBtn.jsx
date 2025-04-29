import clsx from 'clsx';
import Loader from '../Loader/Loader';
import css from './LoadingBtn.module.css';

export default function LoadingBtn({
  children,
  isLoading,
  click,
  disabled,
  type = 'button',
  className,
  size,
}) {
  return (
    <button
      type={type}
      className={clsx(css.btn, className, isLoading ? css.disabled : 'btn-pr-effect')}
      disabled={isLoading || disabled}
      onClick={click}
    >
      {isLoading ? <Loader size={size} /> : children}
    </button>
  );
}
