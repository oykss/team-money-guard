import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_PATHS } from '../../constants/index.js';
import { api, apiAuth } from '../../service/index.js';
import { setAuthToken } from '../../utils/setAuthToken.js';
import { clearSummary } from '../statistics/slice.js';
import { clearTransactions, setHasFetched } from '../transactions/slice.js';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await apiAuth.post(API_PATHS.REGISTER, credentials);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const { data } = await apiAuth.post(API_PATHS.LOGIN, credentials);
    setAuthToken(data.data.accessToken);
    thunkAPI.dispatch(setHasFetched(false));
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    const { data } = await apiAuth.post(API_PATHS.REFRESH);
    setAuthToken(data.data.accessToken);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await apiAuth.post(API_PATHS.LOGOUT);
    setAuthToken();
    thunkAPI.dispatch(clearSummary());
    thunkAPI.dispatch(clearTransactions());
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const currentUser = createAsyncThunk('user/current', async (_, thunkAPI) => {
  try {
    const { data } = await api.get(API_PATHS.CURRENT);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
export const updateUserName = createAsyncThunk(
  'auth/updateUserName',
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.patch('/user/name', payload);
      return data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update name');
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);
export const updateUserPhoto = createAsyncThunk(
  'auth/updateUserPhoto',
  async (formData, thunkAPI) => {
    try {
      const { data } = await api.patch('/user/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update photo');
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);
