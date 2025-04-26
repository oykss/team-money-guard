import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTransactions } from '../../store/transactions/operations';
import ButtonAddTransaction from '../../ui/ButtonAddTransaction/ButtonAddTransaction';
import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction';
import TransactionsList from '../TransactionsList/TransactionsList';

export default function HomeTab() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <>
      <TransactionsList />
      <ButtonAddTransaction onClick={() => setIsOpen(true)} />
      {isOpen && <ModalAddTransaction closeFn={() => setIsOpen(false)} />}
    </>
  );
}
