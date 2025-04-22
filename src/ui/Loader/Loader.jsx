import css from './Loader.module.css';

export default function Loader() {
  return (
    <svg viewBox="25 25 50 50" className={css.svg}>
      <circle r="20" cy="50" cx="50" className={css.circle} />
    </svg>
  );
}
