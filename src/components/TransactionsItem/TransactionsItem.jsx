import clsx from 'clsx';
import { useState } from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectExpenseCategories } from '../../store/categories/selectors';
import { deleteTransaction } from '../../store/transactions/operations';
import LoadingBtn from '../../ui/LoadingBtn/LoadingBtn';
import css from './TransactionsItem.module.css';

export default function TransactionsItem({ transaction, variant = 'card' }) {
  const { _id, date, transactionType, categoryId, comment, summ } = transaction;

  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    dispatch(deleteTransaction(_id))
      .unwrap()
      .finally(() => setIsDeleting(false));
  };

  const expenseCat = useSelector(selectExpenseCategories);

  const findCategoryTitle = categoryId => {
    if (!expenseCat || expenseCat.length === 0) return 'Loading...';
    const category = expenseCat.find(exp => exp._id === categoryId);
    return category ? category.title : 'Income';
  };

  const getDate = date => {
    const unformattedDate = new Date(date);
    const day = String(unformattedDate.getDate()).padStart(2, '0');
    const month = String(unformattedDate.getMonth() + 1).padStart(2, '0');
    const year = unformattedDate.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return variant === 'row' ? (
    <>
      <td>{getDate(date)}</td>
      <td className={css.thType}>{transactionType === 'income' ? '+' : '-'}</td>
      <td>{findCategoryTitle(categoryId)}</td>
      <td>
        <span className={css.length}>{comment}</span>
      </td>
      <td style={{ color: transactionType === 'income' ? '#FFB627' : '#FF868D' }}>
        <span className={css.length}>{summ}</span>
      </td>
      <td className={css.btns}>
        <LoadingBtn
          isLoading={isDeleting}
          className={css['delete-btn']}
          click={handleDelete}
          size={20}
        >
          Delete
        </LoadingBtn>
        <button type="button" className={css['edit-btn']}>
          <MdOutlineModeEditOutline size={20} color="rgba(255, 255, 255, 0.6)" />
        </button>
      </td>
    </>
  ) : (
    <div className={css['item-wrapper']}>
      <div className={css['item-line']}>
        <span className={clsx(css['bold-text'])}>Date</span>
        <span>{getDate(date)}</span>
      </div>
      <div className={css['item-line']}>
        <span className={css['bold-text']}>Type</span>
        <span>{transactionType === 'income' ? '+' : '-'}</span>
      </div>
      <div className={css['item-line']}>
        <span className={css['bold-text']}>Category</span>
        <span>{findCategoryTitle(categoryId)}</span>
      </div>
      <div className={css['item-line']}>
        <span className={css['bold-text']}>Comment</span>
        <span className={css.length}>{comment}</span>
      </div>
      <div className={css['item-line']}>
        <span className={css['bold-text']}>Sum</span>
        <span
          className={css.length}
          style={{ color: transactionType === 'income' ? '#FFB627' : '#FF868D' }}
        >
          {summ}
        </span>
      </div>
      <div className={css['item-line']}>
        <LoadingBtn
          isLoading={isDeleting}
          className={css['delete-btn']}
          click={handleDelete}
          size={20}
        >
          Delete
        </LoadingBtn>
        <button type="button" className={css['edit-btn']}>
          <MdOutlineModeEditOutline size={18} color="rgba(255, 255, 255, 0.6)" />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
}
