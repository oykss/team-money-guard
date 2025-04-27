import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  summary: {
    income: [],
    expense: [],
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  },
  isLoading: false,

  selectedDate: {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  },
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setMonth(state, action) {
      state.selectedDate.month = action.payload;
    },
    setYear(state, action) {
      state.selectedDate.year = action.payload;
    },
    clearSummary(state) {
      state.summary = { ...initialState.summary };
    },
  },
  extraReducers: builder => {
    builder
      .addCase('statistics/fetchStatistics/pending', state => {
        state.isLoading = true;
      })
      .addCase('statistics/fetchStatistics/fulfilled', (state, action) => {
        state.summary = action.payload;
        state.isLoading = false;
      })
      .addCase('statistics/fetchStatistics/rejected', state => {
        state.isLoading = false;
        toast.error('Failed to update the statistics. Please try again.');
      });
  },
});

export const { setMonth, setYear, clearSummary } = statisticsSlice.actions;
export default statisticsSlice.reducer;
