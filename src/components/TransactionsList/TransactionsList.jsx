import { useSelector } from 'react-redux';
import TransactionsItem from '../TransactionsItem/TransactionsItem.jsx';
import { selectTransactions } from '../../store/transactions/selectors.js';
import css from './TransactionsList.module.css';
import Container from '../../ui/Container/Container.jsx';
// import TransactionsListTablet from './TransactionsListTablet.jsx';
import { useMediaPoints } from '../../hooks/useMediaPoints.js';
import clsx from 'clsx';

export default function TransactionsList() {
  const transactions = useSelector(selectTransactions);
  const { isTablet } = useMediaPoints();

  if (transactions.length === 0) {
    return (
      <Container>
        <p>There are no transactions yet.</p>
      </Container>
    );
  }

  return (
    <Container>
      {isTablet ? (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Comment</th>
              <th>Sum</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <TransactionsItem key={tx.id} transaction={tx} variant="row" />
            ))}
          </tbody>
        </table>
      ) : (
        <div className={css.scrollContainer}>
          <ul className={css.list}>
            {transactions.map(transaction => (
              <li
                key={transaction.id}
                className={clsx(css['item-card'], {
                  [css.income]: transaction.type === '+',
                  [css.expense]: transaction.type === '-',
                })}
              >
                <TransactionsItem transaction={transaction} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}
