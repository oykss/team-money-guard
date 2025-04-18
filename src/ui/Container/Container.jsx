import clsx from 'clsx';
import css from './Container.module.css';

export default function Container({ children, className }) {
  return <div className={clsx(css.container, className)}>{children}</div>;
}
