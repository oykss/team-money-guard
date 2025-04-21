import { createSlice } from '@reduxjs/toolkit';

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
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.user = { name: null, email: null, balance: 0 };
        state.token = null;
        state.isLoggedIn = false;
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
      });
  },
});

export default authSlice.reducer;
