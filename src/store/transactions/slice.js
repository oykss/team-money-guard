import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
} from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [
      {
        id: "1",
        date: "04.01.23",
        type: "-",
        category: "Other",
        comment: "Gift for your wife",
        sum: 300,
      },
      {
        id: "2",
        date: "05.01.23",
        type: "+",
        category: "Salary",
        comment: "January payment",
        sum: 1500,
      },
    ],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, handlePending)
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, handleRejected)
      .addCase(addTransaction.pending, handlePending)
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.transactions.push(action.payload);
      })
      .addCase(deleteTransaction.pending, handlePending)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.transactions.filter(
          (transaction) => transaction.id != action.payload.id
        );
      })
      .addCase(deleteTransaction.rejected, handleRejected);
  },
});

export default transactionsSlice.reducer;
