import { useDispatch, useSelector } from "react-redux";
import StatisticsDashboard from "./StatisticsDashboard";
import StatisticTable from "./StatisticTable";
import { useEffect } from "react";
import { fetchStatistics } from "../../store/statistics/operations";
import Chart from "./Chart";

export default function StatisticsTab() {
  const dispatch = useDispatch();

  const { month, year } = useSelector(state => state.statistics.selectedDate);

  useEffect(() => {
    dispatch(fetchStatistics({ month, year }));
  }, [dispatch, month, year]);
  
  return (
    <div>
      <p>Statistics</p>
      <Chart />
      <StatisticsDashboard />
      <StatisticTable />
    </div>
  );
}
