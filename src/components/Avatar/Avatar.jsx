import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/auth/selectors';
import Skeleton from '../../ui/Skeleton/Skeleton';
import css from './Avatar.module.css';

export default function Avatar({ className }) {
  const { name, photo } = useSelector(selectUser);

  return (
    <span className={clsx(css.avatar, className)}>
      {photo ? (
        <img src={photo} alt={name || 'User avatar'} className={css.photo} />
      ) : name ? (
        <span className={css.initial}>{name.charAt(0).toUpperCase()}</span>
      ) : (
        <Skeleton width="32px" height="32px" />
      )}
    </span>
  );
}
