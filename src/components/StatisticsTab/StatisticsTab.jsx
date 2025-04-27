import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatistics } from '../../store/statistics/operations';
import { selectDate } from '../../store/statistics/selectors';
import StatisticsChart from '../StatisticsChart/StatisticsChart';
import StatisticsFilters from '../StatisticsFilters/StatisticsFilters';
import StatisticTable from '../StatisticTable/StatisticTable';
import css from './StatisticsTab.module.css';

export default function StatisticsTab() {
  const dispatch = useDispatch();

  const { month, year } = useSelector(selectDate);

  useEffect(() => {
    dispatch(fetchStatistics({ month, year }));
  }, [dispatch, month, year]);

  return (
    <div className={css.container}>
      <div className={css.wrapChart}>
        <h2 className={css.title}>Statistics</h2>
        <StatisticsChart />
      </div>
      <div className={css.wrapTable}>
        <StatisticsFilters />
        <StatisticTable />
      </div>
    </div>
  );
}
