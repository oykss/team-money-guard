import { useDispatch, useSelector } from "react-redux";
import StatisticsDashboard from "./StatisticsDashboard";
import StatisticTable from "./StatisticTable";
import { useEffect } from "react";
import { fetchStatistics } from "../../store/statistics/operations";
import Chart from "./Chart";
import s from "./StatisticsTab.module.css"

export default function StatisticsTab() {
  const dispatch = useDispatch();

  const { month, year } = useSelector(state => state.statistics.selectedDate);

  useEffect(() => {
    dispatch(fetchStatistics({ month, year }));
  }, [dispatch, month, year]);
  
  return (
    <div className={s.statisticsContainer}>
      <h2 className={s.title}>Statistics</h2>
      <Chart />
      <StatisticsDashboard />
      <StatisticTable />
    </div>
  );
}
