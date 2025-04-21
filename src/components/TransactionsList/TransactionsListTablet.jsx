export default function TransactionsListTablet({ transactions }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Category</th>
          <th>Comment</th>
          <th>Sum</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td>{transaction.date}</td>
            <td>{transaction.type}</td>
            <td>{transaction.category}</td>
            <td>{transaction.comment}</td>
            <td>{transaction.sum}</td>
            <td>
              <button>Delete</button>
              <button>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
