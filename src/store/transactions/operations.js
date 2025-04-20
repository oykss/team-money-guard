import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = import.meta.env.VITE_API_BASE_URL;

axios.defaults.baseURL = baseURL;

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/transactions");
      return response.data;
    } catch (e) {
      console.error();
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/transactions", data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId, thunkAPI) => {
    try {
      const response = await axios.delete("/transactions", transactionId);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updTransaction = createAsyncThunk(
  "transactions/updTransaction",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch("/transactions", data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
