import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { MONTHS, YEARS } from '../../constants';
import { setMonth, setYear } from '../../store/statistics/slice';
import css from './StatisticsFilters.module.css';

export default function StatisticsFilters() {
  const dispatch = useDispatch();
  const { month, year } = useSelector(state => state.statistics.selectedDate);

  const selectedMonthOption = MONTHS.find(m => m.value === month);
  const selectedYearOption = YEARS.find(y => y.value === year);

  const handleMonthChange = selectedOption => {
    dispatch(setMonth(selectedOption.value));
  };
  const handleYearChange = selectedOption => {
    dispatch(setYear(selectedOption.value));
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'rgba(74, 86, 226, 0.1)',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      boxShadow: state.isFocused ? '0 0 0 1px #A27BFF' : 'none',
      color: '#FBFBFB',
      cursor: 'pointer',
    }),
    menu: base => ({
      ...base,
      background:
        'linear-gradient(180deg, rgba(83, 61, 186, 1), rgba(80, 48, 154, 1), rgba(106, 70, 165, 0.75), rgba(133, 93, 175, 0.19))',
      borderRadius: '8px',
      marginTop: '0px',
      overflow: 'hidden',
      zIndex: 5,
    }),
    menuList: base => ({
      ...base,
      padding: '12px 0',
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? 'rgba(162, 123, 255, 0.3)' : 'transparent',
      color: isFocused ? '#FF868D' : '#fff',
      padding: '10px 15px',
      cursor: 'pointer',
    }),
    singleValue: base => ({
      ...base,
      color: '#FBFBFB',
    }),
    dropdownIndicator: base => ({
      ...base,
      color: '#FBFBFB',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  return (
    <div className={css.wrap}>
      <Select
        options={MONTHS}
        value={selectedMonthOption}
        onChange={handleMonthChange}
        styles={customStyles}
      />
      <Select
        options={YEARS}
        value={selectedYearOption}
        onChange={handleYearChange}
        styles={customStyles}
      />
    </div>
  );
}
