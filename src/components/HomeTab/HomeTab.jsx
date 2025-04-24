import { useSelector } from 'react-redux';
import { selectUser } from '../../store/auth/selectors';

export default function HomeTab() {
  const user = useSelector(selectUser);

  return <div>{user.balance}</div>;
}
