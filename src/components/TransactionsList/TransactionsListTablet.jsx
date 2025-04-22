import css from './TransactionsList.module.css';

export default function TransactionsListTablet({ transactions }) {
  return (
    <table>
      <thead className={css.thead}>
        <tr className={css['thead-row']}>
          <th>Date</th>
          <th>Type</th>
          <th>Category</th>
          <th>Comment</th>
          <th>Sum</th>
          <th></th>
        </tr>
      </thead>
      <tbody className={css.tbody}>
        {transactions.map(transaction => (
          <tr key={transaction.id} className={css.row}>
            <td>{transaction.date}</td>
            <td>{transaction.type}</td>
            <td>{transaction.category}</td>
            <td>{transaction.comment}</td>
            <td>{transaction.sum}</td>
            <td>
              <button type="button" className={css['delete-btn']}>
                Delete
              </button>
              <button>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
