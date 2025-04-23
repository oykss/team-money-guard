import { useDispatch } from 'react-redux';
import ButtonAddTransaction from '../ButtonAddTransaction/ButtonAddTransaction';
import TransactionsList from '../TransactionsList/TransactionsList';
import { useEffect } from 'react';
import { getTransactions } from '../../store/transactions/operations';
import Modal from '../../ui/Modal/Modal';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';

import { useState } from 'react';
import { getCategories } from '../../store/categories/operations';

export default function HomeTab() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <TransactionsList />
      <ButtonAddTransaction onClick={handleOpen} />
      {open && (
        <Modal closeFn={handleClose}>
          <AddTransactionForm handleClose={handleClose} />
        </Modal>
      )}
    </div>
  );
}
