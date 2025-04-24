import { createSlice } from "@reduxjs/toolkit";
import { fetchStatistics } from "./operations";

const initialState = {
    statistics: null,
    isLoadfing: false,
    error: null,
    selectedDate: {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    }
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatistics.pending, (state) => {
                state.isLoadfing = true;
                state.error = null;
            })
            .addCase(fetchStatistics.fulfilled, (state, action) => {
                state.statistics = action.payload;
                state.isLoadfing = false;
            })
            .addCase(fetchStatistics.rejected, (state, action) => {
                state.isLoadfing = false;
                state.error = action.payload;
            });
    },
});

export const { setMonth, setYear } = statisticsSlice.actions;
export default statisticsSlice.reducer;