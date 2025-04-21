import { useDispatch } from "react-redux";
import BgBlur from "../../ui/BgBlur/BgBlur";
import ButtonAddTransaction from "../ButtonAddTransaction/ButtonAddTransaction";
import TransactionsList from "../TransactionsList/TransactionsList";
import { useEffect } from "react";
import { getTransactions } from "../../store/transactions/operations";
// import { useState } from "react";

export default function HomeTab() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <BgBlur /> */}
      <TransactionsList />
      <ButtonAddTransaction />
    </div>
  );
}
