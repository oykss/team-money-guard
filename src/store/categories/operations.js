import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_PATHS } from '../../constants';
import { api } from '../../service';

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (_, thunkAPI) => {
    try {
      const response = await api.get(API_PATHS.CATEGORIES);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
