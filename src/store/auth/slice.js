import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  user: {
    name: null,
    email: null,
    balance: 0,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase('auth/register/fulfilled', (state, action) => {
        state.user = action.payload.user;
      })
      .addCase('auth/register/rejected', () => {
        toast.error('Registration failed. Please try again.');
      })
      .addCase('auth/login/fulfilled', (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase('auth/login/rejected', () => {
        toast.error('Login failed. Please try again.');
      })
      .addCase('auth/refresh/pending', state => {
        state.isRefreshing = true;
        state.isLoggedIn = false;
      })
      .addCase('auth/refresh/fulfilled', (state, action) => {
        state.token = action.payload.accessToken;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase('auth/refresh/rejected', state => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
      })
      .addCase('auth/logout/fulfilled', state => {
        state.user = { ...initialState.user };
        state.token = initialState.token;
        state.isLoggedIn = initialState.isLoggedIn;
      });
  },
});

export const { setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
