import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { API_PATHS } from '../../constants/index.js';

export const goitApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const setAuthHeader = token => {
  goitApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  goitApi.defaults.headers.common.Authorization = '';
};

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await goitApi.post(`${API_PATHS.AUTH}/signup`, credentials);
      setAuthHeader(data.token);
      return data;
    } catch (e) {
      if (e.response.data.code === 11000) {
        toast.error('User already exist');
        return thunkAPI.rejectWithValue(e.message);
      }
      console.error('Registration Error: ', e.response?.data);
      toast.error('Registration failed. Please try again later.');
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await goitApi.post(`${API_PATHS.AUTH}/login`, credentials);
      setAuthHeader(data.token);
      return data;
    } catch (e) {
      toast.error('Login failed. Please check your credentials and try again.');
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logoutThunk = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await goitApi.post(`${API_PATHS.AUTH}/logout`);
    clearAuthHeader();
    toast.success('Logged out successfully');
  } catch (e) {
    toast.error('Logout failed. Please try again.');
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refreshUserThunk = createAsyncThunk('auth/refresh', async (_, thunkApi) => {
  const savedToken = thunkApi.getState().auth.token;
  if (savedToken === null) {
    return thunkApi.rejectWithValue('No token found. Please log in.');
  }

  try {
    setAuthHeader(savedToken);
    const { data } = await goitApi.get(`${API_PATHS.AUTH}/current`);
    return data;
  } catch (e) {
    toast.error('Failed to fetch user data.');
    return thunkApi.rejectWithValue(e.message);
  }
});
