import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './operations';

const initialState = {
  categories: [],
  isLoading: false,
  loading: false,
  error: null,
};

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getCategories.pending, handlePending)
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, handleRejected);
  },
});

export default categoriesSlice.reducer;
