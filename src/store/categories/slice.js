import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: 'transactions',
  initialState,
  extraReducers: builder => {},
});

export default categoriesSlice.reducer;
