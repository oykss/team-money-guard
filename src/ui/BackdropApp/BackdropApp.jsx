import css from './BackdropApp.module.css';

export default function BackdropApp() {
  return (
    <div className={css.overlay}>
      <div className={css.wrapper}>
        <div className={css.circle} />
        <div className={css.circle} />
        <div className={css.circle} />
        <div className={css.shadow} />
        <div className={css.shadow} />
        <div className={css.shadow} />
      </div>
    </div>
  );
}
