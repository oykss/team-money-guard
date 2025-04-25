import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../store/transactions/operations';
import { selectTransactions } from '../../store/transactions/selectors';
import ButtonAddTransaction from '../../ui/ButtonAddTransaction/ButtonAddTransaction';
import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction';
import TransactionsList from '../TransactionsList/TransactionsList';

export default function HomeTab() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    if (transactions.length === 0) dispatch(getTransactions());
  }, [dispatch, transactions]);

  return (
    <>
      <TransactionsList />
      <ButtonAddTransaction onClick={() => setIsOpen(true)} />
      {isOpen && <ModalAddTransaction closeFn={() => setIsOpen(false)} />}
    </>
  );
}
