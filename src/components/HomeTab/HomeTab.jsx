import { useDispatch } from "react-redux";
import BgBlur from "../BgBlur/BgBlur";
import ButtonAddTransaction from "../ButtonAddTransaction/ButtonAddTransaction";
import TransactionsList from "../TransactionsList/TransactionsList";
import { useEffect } from "react";
import { getTransactions } from "../../store/transactions/operations";
// import { useState } from "react";
// import { Modal, Box, Typography } from "@mui/material";

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
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            backdropFilter: "blur(100px)",
            bgcolor: "rgba(34, 13, 91, 0.23)",
            boxShadow: "0 4px 60px 0 rgba(0, 0, 0, 0.25)",
            borderRadius: 8,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}
    </div>
  );
}
