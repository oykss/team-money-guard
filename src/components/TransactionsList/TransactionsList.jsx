import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useMediaPoints } from '../../hooks/useMediaPoints.js';
import {
  selectIsLoading,
  selectTransactions,
} from '../../store/transactions/selectors.js';
import Skeleton from '../../ui/Skeleton/Skeleton.jsx';
import Balance from '../Balance/Balance.jsx';
import TransactionsItem from '../TransactionsItem/TransactionsItem.jsx';
import css from './TransactionsList.module.css';

export default function TransactionsList() {
  const transactions = useSelector(selectTransactions);
  const isLoading = useSelector(selectIsLoading);
  const transactionsReverse = [...transactions].reverse();
  const { isMobile, isTablet } = useMediaPoints();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={css.skeletonsContainer}>
          {Array.from({ length: isMobile ? 3 : isTablet ? 4 : 6 }).map((_, index) => (
            <Skeleton key={index} className={css.skeleton} width="" />
          ))}
        </div>
      );
    }

    if (transactions.length === 0) {
      return (
        <div className={css.noTransactionsContainer}>
          <p>There are no transactions yet.</p>
        </div>
      );
    }

    if (isMobile) {
      return (
        <div className={css.scrollContainer}>
          <ul className={css.list}>
            {transactionsReverse.map(transaction => (
              <li
                key={transaction._id}
                className={clsx(css.itemMobile, {
                  [css.income]: transaction.transactionType === 'income',
                  [css.expense]: transaction.transactionType === 'expense',
                })}
              >
                <TransactionsItem transaction={transaction} />
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <table className={css.table}>
        <thead>
          <tr className={css.theadRow}>
            <th>Date</th>
            <th className={css.thType}>Type</th>
            <th>Category</th>
            <th>Comment</th>
            <th>Sum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactionsReverse.map(transaction => (
            <tr key={transaction._id} className={css.itemRow}>
              <TransactionsItem transaction={transaction} variant="row" />
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={css.transactionsContainer}>
      {isMobile && <Balance />}
      {renderContent()}
    </div>
  );
}
