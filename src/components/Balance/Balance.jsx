import css from './Balance.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/auth/selectors';

const Balance = () => {
  const { balance } = useSelector(selectUser);
  const formattedBalance = balance.toLocaleString('uk', {
    style: 'currency',
    currency: 'UAH',
    currencyDisplay: 'narrowSymbol',
  });
  return (
    <div className={css.container}>
      <div className={css.wrap}>
        <p className={css.text}>Your balance</p>
        <p className={css.count}>{formattedBalance}</p>
      </div>
    </div>
  );
};

export default Balance;
