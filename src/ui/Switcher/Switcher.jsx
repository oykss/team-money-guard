import clsx from 'clsx';
import { FiMinus } from 'react-icons/fi';
import { IoAddOutline } from 'react-icons/io5';
import css from './Switcher.module.css';

export default function Switcher({ value, onChange, className }) {
  const isChecked = value === 'expense';

  const handleToggle = () => {
    onChange(isChecked ? 'income' : 'expense');
  };

  return (
    <div className={clsx(css['checkbox-wrapper-51'], className)}>
      <span
        className={clsx(css['switcher-text'], {
          [css.income]: isChecked === false,
        })}
      >
        Income
      </span>
      <input id="cbx-51" type="checkbox" onChange={handleToggle} checked={isChecked} />
      <label className={css.toggle} htmlFor="cbx-51">
        <span>{isChecked ? <FiMinus size={24} /> : <IoAddOutline size={24} />}</span>
      </label>
      <span
        className={clsx(css['switcher-text'], {
          [css.expense]: isChecked === true,
        })}
      >
        Expense
      </span>
    </div>
  );
}
