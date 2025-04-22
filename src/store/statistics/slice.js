import { createSlice } from '@reduxjs/toolkit';
import { fetchStatistics } from './operations';

const initialState = {
  statistics: [],
  isLoading: false, 
  error: null,
  selectedDate: ({
    month: new Date().getMonth() +1,
    year: new Date().getFullYear(),
  })
};

const statisticsSlice = createSlice({
  name: 'statistics',
    initialState,
    reducers: {
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
  },
    extraReducers: builder => {
        builder
            .addCase(fetchStatistics.pending, (state) => {
                state.isLoading = true,
                    state.error = null
            })
            .addCase(fetchStatistics.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.error = null,
                    state.statistics = action.payload
            })
            .addCase(fetchStatistics.rejected, (state, action) => {
                state.isLoading = false,
                state.error = action.payload
            });
  },
});

export const statisticsReducer = statisticsSlice.reducer;
export const { setSelectedDate } = statisticsSlice.actions;