import clsx from 'clsx';
import { useState } from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectExpenseCategories } from '../../store/categories/selectors';
import { deleteTransaction } from '../../store/transactions/operations';
import LoadingBtn from '../../ui/LoadingBtn/LoadingBtn';
import css from './TransactionsItem.module.css';
import { findCategoryTitle } from '../../utils/findCategoryTitle';
import { getDate } from '../../utils/getDate';
import ModalEditTransaction from '../ModalEditTransaction/ModalEditTransaction';

export default function TransactionsItem({ transaction, variant = 'card' }) {
  const { _id, date, transactionType, categoryId, comment, summ } = transaction;

  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    dispatch(deleteTransaction(_id))
      .unwrap()
      .finally(() => setIsDeleting(false));
  };

  const expenseCat = useSelector(selectExpenseCategories);

  return variant === 'row' ? (
    <>
      <td>{getDate(date)}</td>
      <td className={css.thType}>{transactionType === 'income' ? '+' : '-'}</td>
      <td>{findCategoryTitle(categoryId, expenseCat)}</td>
      <td>
        <span className={css.length}>{comment}</span>
      </td>
      <td style={{ color: transactionType === 'income' ? '#FFB627' : '#FF868D' }}>
        <span className={css.length}>{summ}</span>
      </td>
      <td className={css.btns}>
        <LoadingBtn
          isLoading={isDeleting}
          className={css.deleteBtn}
          click={handleDelete}
          size={20}
        >
          Delete
        </LoadingBtn>
        <button type="button" className={css.editBtn} onClick={() => setIsOpen(true)}>
          <MdOutlineModeEditOutline size={20} color="rgba(255, 255, 255, 0.6)" />
        </button>
        {isOpen && (
          <ModalEditTransaction
            transaction={transaction}
            closeFn={() => setIsOpen(false)}
          />
        )}
      </td>
    </>
  ) : (
    <div className={css.itemWrapper}>
      <div className={css.itemLine}>
        <span className={clsx(css.boldText)}>Date</span>
        <span>{getDate(date)}</span>
      </div>
      <div className={css.itemLine}>
        <span className={css.boldText}>Type</span>
        <span>{transactionType === 'income' ? '+' : '-'}</span>
      </div>
      <div className={css.itemLine}>
        <span className={css.boldText}>Category</span>
        <span>{findCategoryTitle(categoryId, expenseCat)}</span>
      </div>
      <div className={css.itemLine}>
        <span className={css.boldText}>Comment</span>
        <span className={css.length}>{comment}</span>
      </div>
      <div className={css.itemLine}>
        <span className={css.boldText}>Sum</span>
        <span
          className={css.length}
          style={{ color: transactionType === 'income' ? '#FFB627' : '#FF868D' }}
        >
          {summ}
        </span>
      </div>
      <div className={css.itemLine}>
        <LoadingBtn
          isLoading={isDeleting}
          className={css.deleteBtn}
          click={handleDelete}
          size={20}
        >
          Delete
        </LoadingBtn>
        <button type="button" className={css.editBtn} onClick={() => setIsOpen(true)}>
          <MdOutlineModeEditOutline size={18} color="rgba(255, 255, 255, 0.6)" />
          <span>Edit</span>
        </button>
      </div>
      {isOpen && (
        <ModalEditTransaction
          closeFn={() => setIsOpen(false)}
          transaction={transaction}
        />
      )}
    </div>
  );
}
