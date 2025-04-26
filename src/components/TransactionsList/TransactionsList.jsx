import clsx from 'clsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaPoints } from '../../hooks/useMediaPoints.js';
import {
  selectIsFetching,
  selectTransactions,
} from '../../store/transactions/selectors.js';
import Skeleton from '../../ui/Skeleton/Skeleton.jsx';
import Balance from '../Balance/Balance.jsx';
import ModalEditTransaction from '../ModalEditTransaction/ModalEditTransaction.jsx';
import TransactionsItem from '../TransactionsItem/TransactionsItem.jsx';
import css from './TransactionsList.module.css';

export default function TransactionsList() {
  const transactions = useSelector(selectTransactions);
  const isFetching = useSelector(selectIsFetching);
  const transactionsReverse = [...transactions].reverse();
  const { isMobile, isTablet } = useMediaPoints();
  const [editTransaction, setEditTransaction] = useState({});

  const renderContent = () => {
    if (isFetching) {
      return (
        <div className={css.skeletonsContainer}>
          {Array.from({ length: isMobile ? 3 : isTablet ? 4 : 6 }).map((_, index) => (
            <Skeleton key={index} className={css.skeleton} width="" />
          ))}
        </div>
      );
    }

    if (transactions.length === 0 && !isFetching) {
      return (
        <div className={css.noTransactionsContainer}>
          <p>There are no transactions yet.</p>
        </div>
      );
    }

    if (isMobile) {
      return (
        <ul className={css.list}>
          {transactionsReverse.map(transaction => (
            <li
              key={transaction._id}
              className={clsx(css.itemMobile, {
                [css.income]: transaction.transactionType === 'income',
                [css.expense]: transaction.transactionType === 'expense',
              })}
            >
              <TransactionsItem
                transaction={transaction}
                handleEditTransaction={setEditTransaction}
              />
            </li>
          ))}
        </ul>
      );
    }

    return (
      <table className={css.table}>
        <thead>
          <tr className={css.theadRow}>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Comment</th>
            <th>Sum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactionsReverse.map(transaction => (
            <tr key={transaction._id} className={css.itemRow}>
              <TransactionsItem
                transaction={transaction}
                variant="row"
                handleEditTransaction={setEditTransaction}
              />
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <div className={css.transactionsContainer}>
        {isMobile && <Balance />}
        {renderContent()}
      </div>

      {editTransaction?._id && (
        <ModalEditTransaction
          transaction={editTransaction}
          closeFn={() => setEditTransaction({})}
        />
      )}
    </>
  );
}
