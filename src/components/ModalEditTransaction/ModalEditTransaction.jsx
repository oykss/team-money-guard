import Modal from '../../ui/Modal/Modal';
import EditTransactionForm from '../EditTransactionForm/EditTransactionForm';

export default function ModalEditTransaction({ closeFn, transaction }) {
  return (
    <Modal closeFn={closeFn}>
      <EditTransactionForm handleClose={closeFn} transaction={transaction} />
    </Modal>
  );
}
