import s from './Balance.module.css';
import Container from '../../ui/Container/Container';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/auth/selectors';

const Balance = () => {
  const { balance } = useSelector(selectUser);
  return (
    <Container className={s.container}>
      <div className={s.wrap}>
        <p className={s.text}>Your balance</p>
        <p className={s.count}>₴ {balance}</p>
      </div>
    </Container>
  );
};

export default Balance;
