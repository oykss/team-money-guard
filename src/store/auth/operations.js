import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_PATHS } from '../../constants/index.js';
import { setAuthToken } from '../../utils/setAuthToken.js';
import { api } from '../../service/index.js';

// REGISTER
export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post(`${API_PATHS.AUTH}/signup`, credentials);
      setAuthToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// LOGIN
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post(`${API_PATHS.AUTH}/login`, credentials);
      setAuthToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// LOGOUT
export const logoutThunk = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await api.post(`${API_PATHS.AUTH}/logout`);
    setAuthToken(null);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// REFRESH
export const refreshUserThunk = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const savedToken = thunkAPI.getState().auth.token;
  if (!savedToken) {
    return thunkAPI.rejectWithValue('No token found. Please log in.');
  }

  try {
    setAuthToken(savedToken);
    const { data } = await api.get(`${API_PATHS.AUTH}/current`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
