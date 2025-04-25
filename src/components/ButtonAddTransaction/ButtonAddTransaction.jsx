import { IoAddOutline } from 'react-icons/io5';
import css from './ButtonAddTransaction.module.css';

export default function ButtonAddTransaction({ onClick }) {
  return (
    <button type="button" className={css.btn} onClick={onClick}>
      <IoAddOutline size={24} color="#fff" />
    </button>
  );
}
