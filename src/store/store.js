import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/slice';
import categoriesSlice from './categories/slice';
import transactionsSlice from './transactions/slice';
import statisticsSlice from './statistics/slice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    categories: categoriesSlice,
    transactions: transactionsSlice,
    statistics: statisticsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
