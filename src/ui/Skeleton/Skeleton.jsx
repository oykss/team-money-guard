import clsx from 'clsx';
import css from './Skeleton.module.css';

export default function Skeleton({ className, width = '100%', height }) {
  return (
    <span className={clsx(css.skeleton, className)} style={{ width, height }}></span>
  );
}
