import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../service';
import { setBalance } from '../auth/slice';

export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/transactions');
      return data.data;
    } catch (e) {
      console.error();
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  'transactions/addTransaction',
  async (data, thunkAPI) => {
    try {
      const res = await api.post('/transactions', data);

      thunkAPI.dispatch(setBalance(res.data.data.balance));

      return res.data.data.transaction;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (transactionId, thunkAPI) => {
    try {
      const { data } = await api.delete(`/transactions/${transactionId}`);

      thunkAPI.dispatch(setBalance(data.data.balance));

      return data.data.transaction;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updTransaction = createAsyncThunk(
  'transactions/updTransaction',
  async (data, transactionId, thunkAPI) => {
    try {
      const response = await api.patch(`/transactions/:${transactionId}`, data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
