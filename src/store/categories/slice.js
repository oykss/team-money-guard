import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './operations';

const initialState = {
  categories: [],
  isLoading: false,
  loading: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: builder => {
    builder
      .addCase('categories/getCategories/pending', state => {
        state.loading = true;
      })
      .addCase('categories/getCategories/fulfilled', (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, state => {
        state.loading = false;
      });
  },
});

export default categoriesSlice.reducer;
