import { createSlice } from '@reduxjs/toolkit';
// import { addTransaction, deleteTransaction, getTransactions } from './operations';
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
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  extraReducers: builder => {
    builder
      .addCase('transactions/getTransactions/pending', handlePending)
      .addCase('transactions/getTransactions/fulfilled', (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.transactions = action.payload;
      })
      .addCase('/transactions/getTransactions/rejected', () => {
        handleRejected;
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
      .addCase('transactions/deleteTransaction/pending', handlePending)
      .addCase('transactions/deleteTransaction/fulfilled', (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.transactions = state.transactions.filter(
          transaction => transaction._id !== action.meta.arg
        );
      })
      .addCase('transactions/deleteTransaction/rejected', handleRejected)
      .addCase('transactions/updTransaction/pending', handlePending)
      .addCase('transactions/updTransaction/fulfilled', state => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase('transactions/updTransaction/rejected', (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error('Failed to update the transaction. Please try again.');
      });
  },
});

export default transactionsSlice.reducer;
