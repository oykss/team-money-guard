import css from "./TransactionsItem.module.css";
import { MdOutlineModeEditOutline } from "react-icons/md";
import clsx from "clsx";
import { useMediaPoints } from "../../hooks/useMediaPoints";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../store/transactions/operations";

export default function TransactionsItem({ transaction }) {
  const { date, type, category, comment, sum } = transaction;
  const { isMobile } = useMediaPoints();
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTransaction(transaction.id));
  };

  return (
    <ul
      className={clsx(css["item-card"], {
        [css.income]: type === "+",
        [css.loss]: type === "-",
      })}
    >
      <li className={css["item-line"]}>
        <span className={clsx(css["bold-text"], { [css.hidden]: !isMobile })}>
          Date
        </span>
        <span>{date}</span>
      </li>
      <li className={css["item-line"]}>
        <span className={css["bold-text"]}>Type</span>
        <span>{type}</span>
      </li>
      <li className={css["item-line"]}>
        <span className={css["bold-text"]}>Category</span>
        <span>{category}</span>
      </li>
      <li className={css["item-line"]}>
        <span className={css["bold-text"]}>Comment</span>
        <span>{comment}</span>
      </li>
      <li className={css["item-line"]}>
        <span className={css["bold-text"]}>Sum</span>
        <span>{sum}</span>
      </li>
      <li className={css["item-line"]}>
        <button
          type="button"
          className={css["delete-btn"]}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button type="button" className={css["edit-btn"]}>
          <MdOutlineModeEditOutline
            size={14}
            viewBox="0 0 22 22"
            color="rgba(255, 255, 255, 0.6)"
          />
          <span>Edit</span>
        </button>
      </li>
    </ul>
  );
}
