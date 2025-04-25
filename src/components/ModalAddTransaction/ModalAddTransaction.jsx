import Modal from '../../ui/Modal/Modal';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';

export default function ModalAddTransaction({ closeFn }) {
  return (
    <Modal closeFn={closeFn}>
      <AddTransactionForm handleClose={closeFn} />
    </Modal>
  );
}
