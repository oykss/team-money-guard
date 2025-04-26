import css from './Loader.module.css';

export default function Loader({ size }) {
  return (
    <svg viewBox="25 25 50 50" className={css.svg} style={{ width: size, height: size }}>
      <circle r="20" cy="50" cx="50" className={css.circle} />
    </svg>
  );
}
