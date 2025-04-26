import { useSelector } from "react-redux"
import s from "./StatisticsTab.module.css"
import { getCategoryColor, formatNumber } from "../../constants";

const StatisticTable = () => {
    const summary = useSelector(state => state.statistics.summary);
    const { expense = [], totalExpense = 0, totalIncome = 0 } = summary;

    

    if (!expense.length) {
        return <p>No transactions for the selected period</p>
    }

    return (
        <div>
            <table className={s.statisticsTable}>
                <thead>
                    <tr className={s.tableHeader}>
                        <th className={s.leftCorner}>Category</th>
                        <th className={s.rightCorner}>Sum</th>
                    </tr>
                </thead>
                <tbody>
                    {expense.filter(category => category.total > 0).map(category => {
                        const color = getCategoryColor(category.title);

                        return (
                            <tr key={category.categoryId} className={s.tableItem}>
                                <td className={s.categoryColumn}>
                                    <span className={s.categoryMarker} style={{ backgroundColor: color}}></span>
                                    {category.title}
                                </td>
                                <td className={s.sumColumn}>{formatNumber(category.total)}</td>
                            </tr>
                        )
                    })}
                    <tr key={totalExpense}>
                        <td className={s.transactionsType}>Expenses:</td>
                        <td className={s.totalExpense}>{formatNumber(totalExpense)}</td>
                    </tr>
                    <tr key={totalIncome}>
                        <td className={s.transactionsType}>Income:</td>
                        <td className={s.totalIncome}>{formatNumber(totalIncome)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default StatisticTable;