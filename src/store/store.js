import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/slice';
import categoriesSlice from './categories/slice';
import transactionsSlice from './transactions/slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    categories: categoriesSlice,
    transactions: transactionsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
