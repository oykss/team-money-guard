import { useSelector } from 'react-redux';
import { selectUser } from '../../store/auth/selectors';
import { formatNumber } from '../../utils/formatNumber';
import css from './Balance.module.css';

const Balance = () => {
  const { balance } = useSelector(selectUser);

  return (
    <div className={css.container}>
      <div className={css.wrap}>
        <p className={css.text}>Your balance</p>
        <p className={css.count}>{formatNumber(balance, { currency: true })}</p>
      </div>
    </div>
  );
};

export default Balance;
