import { useSelector } from 'react-redux';
import { formatNumber } from '../../utils/formatNumber';
import { getCategoryColor } from '../../utils/getCategoryColor';
import css from './StatisticTable.module.css';

export default function StatisticTable() {
  const summary = useSelector(state => state.statistics.summary);
  const { expense = [], totalExpense = 0, totalIncome = 0 } = summary;

  if (!expense.length) {
    return <p>No transactions for the selected period</p>;
  }

  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th>Category</th>
          <th>Sum</th>
        </tr>
      </thead>
      <tbody>
        {expense
          .filter(category => category.total > 0)
          .map(category => (
            <tr key={category.categoryId} className={css.category}>
              <td>
                <span style={{ backgroundColor: getCategoryColor(category.title) }} />
                {category.title}
              </td>
              <td>{formatNumber(category.total)}</td>
            </tr>
          ))}
        <tr className={css.expenses}>
          <td>Expenses:</td>
          <td>{formatNumber(totalExpense)}</td>
        </tr>
        <tr className={css.income}>
          <td>Income:</td>
          <td>{formatNumber(totalIncome)}</td>
        </tr>
      </tbody>
    </table>
  );
}
