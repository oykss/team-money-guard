import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_PATHS } from '../../constants/index.js';
import { api, apiAuth } from '../../service/index.js';
import { setAuthToken } from '../../utils/setAuthToken.js';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await apiAuth.post(API_PATHS.REGISTER, credentials);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    const { data } = await apiAuth.post(API_PATHS.LOGIN, credentials);
    setAuthToken(data.data.accessToken);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refresh = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  try {
    const { data } = await apiAuth.post(API_PATHS.REFRESH);
    setAuthToken(data.data.accessToken);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await apiAuth.post(API_PATHS.LOGOUT);
    setAuthToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const currentUser = createAsyncThunk('user/current', async (_, thunkAPI) => {
  try {
    const { data } = await api.get(API_PATHS.CURRENT);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
