import { useSelector } from 'react-redux';
import TransactionsItem from '../TransactionsItem/TransactionsItem.jsx';
import { selectTransactions } from '../../store/transactions/selectors.js';
import css from './TransactionsList.module.css';
import Container from '../../ui/Container/Container.jsx';
import TransactionsListTablet from './TransactionsListTablet.jsx';
import { useMediaPoints } from '../../hooks/useMediaPoints.js';

export default function TransactionsList() {
  const transactions = useSelector(selectTransactions);
  const isTablet = useMediaPoints();

  if (transactions.length === 0) {
    return (
      <Container>
        <p>There are no transactions yet.</p>
      </Container>
    );
  }

  return (
    <Container>
      {isTablet.isTablet ? (
        <TransactionsListTablet transactions={transactions} />
      ) : (
        <ul className={css['transactions-list']}>
          {transactions.map(transaction => (
            <li key={transaction.id}>
              <TransactionsItem transaction={transaction} />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
