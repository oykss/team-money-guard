import { useSelector } from "react-redux"
import s from "./StatisticsTab.module.css"
import { CATEGORY, formatNumber } from "../../constants";

const StatisticTable = () => {
    const summary = useSelector(state => state.statistics.summary);
    const { expense = [], totalExpense = 0, totalIncome = 0 } = summary;

    const getCategoryColor = (title) => {
        const entry = Object.entries(CATEGORY).find(
            ([, value]) => value.label === title
        );
        return entry ? entry[1].color : '#fff';
    };

    if (!expense.length) {
        return <p>No transactions for the selected period</p>
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Sum</th>
                    </tr>
                </thead>
                <tbody>
                    {expense.filter(category => category.total > 0).map(category => {
                        const color = getCategoryColor(category.title);

                        return (
                            <tr key={category.categoryId}>
                                <td>
                                    <span className={s.categoryMarker} style={{ backgroundColor: color}}></span>
                                    {category.title}
                                </td>
                                <td>{formatNumber(category.total)}</td>
                            </tr>
                        )
                    })}
                    <tr key={totalExpense}>
                        <td>Expenses:</td>
                        <td>{formatNumber(totalExpense)}</td>
                    </tr>
                    <tr key={totalIncome}>
                        <td>Income:</td>
                        <td>{formatNumber(totalIncome)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default StatisticTable;