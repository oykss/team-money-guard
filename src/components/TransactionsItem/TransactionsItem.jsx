import css from './TransactionsItem.module.css';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from '../../store/transactions/operations';
import clsx from 'clsx';
import { selectExpenseCategories } from '../../store/categories/selectors';
import { useMediaPoints } from '../../hooks/useMediaPoints';

export default function TransactionsItem({ transaction, variant = 'card' }) {
  const { _id, date, transactionType, categoryId, comment, summ } = transaction;
  const expenseCat = useSelector(selectExpenseCategories);

  const findCategoryTitle = categoryId => {
    if (!expenseCat || expenseCat.length === 0) return 'Loading...';
    const category = expenseCat.find(exp => exp._id === categoryId);
    return category ? category.title : 'Income';
  };
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTransaction(_id));
  };

  const getDate = date => {
    const unfromattedDate = new Date(date);
    const formattedDate = unfromattedDate.toLocaleDateString('en-GB');
    return formattedDate;
  };

  const { isMobile } = useMediaPoints();
  if (variant === 'row') {
    return (
      <>
        <td>{getDate(date)}</td>
        <td>{transactionType}</td>
        <td>{findCategoryTitle(categoryId)}</td>
        <td>{comment}</td>
        <td>{summ}</td>
        <td className={css.btns}>
          <button type="button" className={css['delete-btn']} onClick={handleDelete}>
            Delete
          </button>
          <button type="button" className={css['edit-btn']}>
            <MdOutlineModeEditOutline
              size={14}
              viewBox="0 0 22 22"
              color="rgba(255, 255, 255, 0.6)"
            />
            {isMobile && <span>Edit</span>}
          </button>
        </td>
      </>
    );
  }

  return (
    <div className={css['item-wrapper']}>
      <div className={css['item-line']}>
        <span className={clsx(css['bold-text'])}>Date</span>
        <span>{getDate(date)}</span>
      </div>
      <div className={css['item-line']}>
        <span className={css['bold-text']}>Type</span>
        <span>{transactionType}</span>
      </div>
      <div className={css['item-line']}>
        <span className={css['bold-text']}>Category</span>
        <span>{findCategoryTitle(categoryId)}</span>
      </div>
      <div className={css['item-line']}>
        <span className={css['bold-text']}>Comment</span>
        <span>{comment}</span>
      </div>
      <div className={css['item-line']}>
        <span className={css['bold-text']}>Sum</span>
        <span>{summ}</span>
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
