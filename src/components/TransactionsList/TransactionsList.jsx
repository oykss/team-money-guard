import { useSelector } from 'react-redux';
import TransactionsItem from '../TransactionsItem/TransactionsItem.jsx';
import { selectTransactions } from '../../store/transactions/selectors.js';
import css from './TransactionsList.module.css';
import Container from '../../ui/Container/Container.jsx';
import { useMediaPoints } from '../../hooks/useMediaPoints.js';
import clsx from 'clsx';
import Balance from '../Balance/Balance.jsx';

export default function TransactionsList() {
  const transactions = useSelector(selectTransactions);

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
            {transactions.map(transaction => (
              <li
                key={transaction._id}
                className={clsx(css['item-card'], {
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
            <tr className={css['thead-row']}>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Comment</th>
              <th>Sum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction._id} className={css['item-row']}>
                <TransactionsItem transaction={transaction} variant="row" />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
