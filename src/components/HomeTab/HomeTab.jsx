import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../store/transactions/operations';
import { selectHasFetched } from '../../store/transactions/selectors';
import ButtonAddTransaction from '../../ui/ButtonAddTransaction/ButtonAddTransaction';
import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction';
import TransactionsList from '../TransactionsList/TransactionsList';

export default function HomeTab() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const hasFetched = useSelector(selectHasFetched);

  useEffect(() => {
    if (!hasFetched) dispatch(getTransactions());
  }, [dispatch, hasFetched]);

  return (
    <>
      <TransactionsList />
      <ButtonAddTransaction onClick={() => setIsOpen(true)} />
      {isOpen && <ModalAddTransaction closeFn={() => setIsOpen(false)} />}
    </>
  );
}
