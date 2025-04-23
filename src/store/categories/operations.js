import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../service';

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/categories');
      return response.data.data;
    } catch (e) {
      console.error();
      return thunkAPI.rejectWithValue(e);
    }
  }
);
