import { useSelector } from "react-redux";
import TransactionsItem from "../TransactionsItem/TransactionsItem.jsx";
import { selectTransactions } from "../../store/transactions/selectors.js";
import css from "./TransactionsList.module.css";
import Container from "../../ui/Container/Container.jsx";

export default function TransactionsList() {
  const transactions = useSelector(selectTransactions);
  return (
    <Container>
      TransactionList
      <ul className={css["transactions-list"]}>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <TransactionsItem transaction={transaction} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
