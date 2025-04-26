import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = {
  transactions: [],
  isLoading: false,
  error: null,
  isFetching: false,
  hasFetched: false,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  extraReducers: builder => {
    builder
      .addCase('transactions/getTransactions/pending', state => {
        state.isFetching = true;
      })
      .addCase('transactions/getTransactions/fulfilled', (state, action) => {
        state.isFetching = false;
        state.error = null;
        state.transactions = action.payload;
        state.hasFetched = true;
      })
      .addCase('/transactions/getTransactions/rejected', (state, action) => {
        handleRejected(state, action);
        state.isFetching = false;
        toast.error('Failed to get transactions. Please try again.');
      })
      .addCase('transactions/addTransaction/pending', handlePending)
      .addCase('transactions/addTransaction/fulfilled', (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.transactions.push(action.payload);
      })
      .addCase('transactions/addTransaction/rejected', (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error('Failed to add transaction. Please try again.');
      })
      .addCase('transactions/deleteTransaction/fulfilled', (state, action) => {
        state.error = null;
        state.transactions = state.transactions.filter(
          transaction => transaction._id !== action.meta.arg
        );
      })
      .addCase('transactions/deleteTransaction/rejected', handleRejected)
      .addCase('transactions/updTransaction/pending', handlePending)
      .addCase('transactions/updTransaction/fulfilled', (state, action) => {
        state.isLoading = false;
        state.error = null;
        const newTransaction = action.payload;
        const index = state.transactions.findIndex(t => t._id === newTransaction._id);
        if (index !== -1) {
          state.transactions[index] = newTransaction;
        }
      })
      .addCase('transactions/updTransaction/rejected', (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error('Failed to update the transaction. Please try again.');
      });
  },
});

export default transactionsSlice.reducer;
