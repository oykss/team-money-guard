import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../service';

export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/transactions');
      console.log(response.data);
      return response.data.data.data;
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
      const response = await api.post('/transactions', data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (transactionId, thunkAPI) => {
    try {
      const response = await api.delete(`/transactions/:${transactionId}`);
      return response.data;
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
