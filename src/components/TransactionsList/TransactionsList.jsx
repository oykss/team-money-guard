import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { useMediaPoints } from '../../hooks/useMediaPoints.js';
import { selectTransactions } from '../../store/transactions/selectors.js';
import Balance from '../Balance/Balance.jsx';
import TransactionsItem from '../TransactionsItem/TransactionsItem.jsx';
import css from './TransactionsList.module.css';

export default function TransactionsList() {
  const transactions = useSelector(selectTransactions);
  const transactionsReverse = [...transactions]?.reverse();

  const { isMobile } = useMediaPoints();
  if (transactions.length === 0) {
    return (
      <div className={css.noTransactionsContainer}>
        {isMobile && <Balance />}
        <p>There are no transactions yet.</p>
      </div>
    );
  }

  return (
    <div className={css.transactionsContainer}>
      {isMobile ? (
        <div className={css.scrollContainer}>
          <Balance />
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
      ) : (
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
      )}
    </div>
  );
}
