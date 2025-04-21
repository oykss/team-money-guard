import s from './Balance.module.css';
import Container from '../../ui/Container/Container';

const Balance = () => {
  return (
    <Container>
      <div className={s.wrap}>
        <p className={s.text}>Your balance</p>
        <p className={s.count}>₴ 24000.00</p>
      </div>
    </Container>
  );
};

export default Balance;
