import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../service/index";


export const fetchStatistics = createAsyncThunk(
    'statistics/fetchStatistics',
    async ({month, year}, thunkAPI) => {
        try {
            const formattedMonth = month.toString().padStart(2, '0');
            const formattedDate = `${year}-${formattedMonth}`;
            
            const response = await api.get(`/summary?date=${formattedDate}`);
            return response.data.data.data;
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data.message || 'Something went wrong');
        };
    }
);