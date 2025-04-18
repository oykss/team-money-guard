import ButtonAddTransaction from "../ButtonAddTransaction/ButtonAddTransaction";
import TransactionsList from "../TransactionsList/TransactionsList";

export default function HomeTab() {
  return (
    <div>
      <TransactionsList />
      <ButtonAddTransaction />
    </div>
  );
}
