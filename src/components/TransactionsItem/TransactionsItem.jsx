import css from './TransactionsItem.module.css';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../../store/transactions/operations';
import clsx from 'clsx';

export default function TransactionsItem({ transaction, variant = 'card' }) {
  const { date, type, category, comment, sum } = transaction;
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTransaction(transaction.id));
  };
  if (variant === 'row') {
    return (
      <tr>
        <td>{date}</td>
        <td>{type}</td>
        <td>{category}</td>
        <td>{comment}</td>
        <td>{sum}</td>
      </tr>
    );
  }

  return (
    <div className={css['item-wrapper']}>
      <div className={css['item-line']}>
        <span className={clsx(css['bold-text'])}>Date</span>
        <span>{date}</span>
      </div>
      <div className={css['item-line']}>
        <span className={css['bold-text']}>Type</span>
        <span>{type}</span>
      </div>
      <div className={css['item-line']}>
        <span className={css['bold-text']}>Category</span>
        <span>{category}</span>
      </div>
      <div className={css['item-line']}>
        <span className={css['bold-text']}>Comment</span>
        <span>{comment}</span>
      </div>
      <div className={css['item-line']}>
        <span className={css['bold-text']}>Sum</span>
        <span>{sum}</span>
      </div>
      <div className={css['item-line']}>
        <button type="button" className={css['delete-btn']} onClick={handleDelete}>
          Delete
        </button>
        <button type="button" className={css['edit-btn']}>
          <MdOutlineModeEditOutline
            size={14}
            viewBox="0 0 22 22"
            color="rgba(255, 255, 255, 0.6)"
          />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
}
