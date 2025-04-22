import { createSlice, isAnyOf } from '@reduxjs/toolkit';
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
  isLoading: false,
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
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
      })
      .addCase('auth/login/rejected', () => {
        toast.error('Login failed. Please try again.');
      })
      .addCase('auth/refresh/pending', state => {
        state.isRefreshing = true;
        state.isLoggedIn = false;
      })
      .addCase('auth/refresh/fulfilled', (state, action) => {
        state.token = action.payload.data.accessToken;
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
      })
      .addCase('user/current/fulfilled', (state, action) => {
        state.user.name = action.payload.data.name;
        state.user.email = action.payload.data.email;
        state.user.balance = action.payload.data.balance;
      })
      .addMatcher(
        isAnyOf(
          action => action.type === 'auth/register/pending',
          action => action.type === 'auth/login/pending',
          action => action.type === 'auth/logout/pending'
        ),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          action => action.type === 'auth/register/rejected',
          action => action.type === 'auth/login/rejected',
          action => action.type === 'auth/logout/rejected',
          action => action.type === 'auth/register/fulfilled',
          action => action.type === 'auth/login/fulfilled',
          action => action.type === 'auth/logout/fulfilled'
        ),
        state => {
          state.isLoading = false;
        }
      );
  },
});

export const { setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
