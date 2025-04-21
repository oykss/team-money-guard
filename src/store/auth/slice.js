import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { loginThunk, logoutThunk, refreshUserThunk, registerThunk } from './operations';

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
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        const message = action.payload?.toLowerCase() || '';

        const isDuplicateUser =
          message.includes('11000') ||
          message.includes('409') ||
          message.includes('exist');

        if (isDuplicateUser) {
          toast.error('Користувач з таким email вже існує!');
        } else {
          toast.error(action.payload || 'Помилка при реєстрації. Спробуйте ще раз.');
        }
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        if (action.payload === 'Invalid credentials') {
          toast.error('Incorrect email or password. Please try again.');
        } else {
          toast.error(action.payload || 'Login failed. Please try again.');
        }
      })

      .addCase(logoutThunk.fulfilled, state => {
        state.user = { name: null, email: null, balance: 0 };
        state.token = null;
        state.isLoggedIn = false;
        toast.success('Logged out successfully');
      })
      .addCase(logoutThunk.rejected, () => {
        toast.error('Logout failed. Try again.');
      })
      .addCase(refreshUserThunk.pending, (state, action) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })

      .addCase(refreshUserThunk.rejected, (state, action) => {
        state.isRefreshing = false;
        toast.error(action.payload || 'Session expired. Please log in again.');
      });
  },
});

export default authSlice.reducer;
