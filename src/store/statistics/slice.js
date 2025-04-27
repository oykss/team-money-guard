import { createSlice } from '@reduxjs/toolkit';
import { fetchStatistics } from './operations';

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
      .addCase(fetchStatistics.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.summary = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchStatistics.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const { setMonth, setYear, clearSummary } = statisticsSlice.actions;
export default statisticsSlice.reducer;
