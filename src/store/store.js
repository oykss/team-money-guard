import { configureStore } from '@reduxjs/toolkit';
import persistStore from 'redux-persist/es/persistStore';
import { authReducer } from './auth/slice';
import categoriesSlice from './categories/slice';
import transactionsSlice from './transactions/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesSlice,
    transactions: transactionsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
