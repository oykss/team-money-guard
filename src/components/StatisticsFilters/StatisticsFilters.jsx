import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { MONTHS, YEARS } from '../../constants';
import { selectDate } from '../../store/statistics/selectors';
import { setMonth, setYear } from '../../store/statistics/slice';
import css from './StatisticsFilters.module.css';

export default function StatisticsFilters() {
  const dispatch = useDispatch();
  const { month, year } = useSelector(selectDate);

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
        'linear-gradient(180deg, rgba(83, 61, 186), rgba(80, 48, 154), rgba(106, 70, 165), rgba(133, 93, 175))',
      borderRadius: '8px',
      marginTop: '0px',
      overflow: 'hidden',
      zIndex: 5,
    }),
    menuList: base => ({
      ...base,
      '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: '4px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
      },
      '::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '4px',
      },
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
    dropdownIndicator: (base, { isFocused }) => ({
      ...base,
      color: isFocused ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.6)',
      transition: 'color 200ms ease',
      '&:hover': {
        color: 'rgba(255, 255, 255, 0.6)',
      },
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
