import css from "./TransactionsItem.module.css";
import { MdOutlineModeEditOutline } from "react-icons/md";

export default function TransactionsItem({ transaction }) {
  return (
    <div>
      <ul className={css["item-card"]}>
        <li className={css["item-line"]}>
          <span className={css["bold-text"]}>Date</span>
          {transaction.date}
        </li>
        <li className={css["item-line"]}>
          <span className={css["bold-text"]}>Type</span>
          {transaction.type}
        </li>
        <li className={css["item-line"]}>
          <span className={css["bold-text"]}>Category</span>
          {transaction.category}
        </li>
        <li className={css["item-line"]}>
          <span className={css["bold-text"]}>Comment</span>
          {transaction.comment}
        </li>
        <li className={css["item-line"]}>
          <span className={css["bold-text"]}>Sum</span>
          {transaction.sum}
        </li>
        <div className={css["item-line"]}>
          <button type="button" className={css["delete-btn"]}>
            Delete
          </button>
          <div className={css["edit-div"]}>
            <button type="button" className={css["edit-btn"]}>
              <MdOutlineModeEditOutline color="rgba(255, 255, 255, 0.6)" />
              Edit
            </button>
          </div>
        </div>
      </ul>
    </div>
  );
}
