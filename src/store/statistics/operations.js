import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../service/index";


export const fetchStatistics = createAsyncThunk(
    'statistics/fetchStatistics',
    async ({month, year}, thunkAPI) => {
        try {
            const formattedMonth = month.toString().padStart(2, '0');
            const formattedDate = `${year}-${formattedMonth}`;
            
            const response = await api.get(`/transactions/summary?period=${formattedDate}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || 'Something went wrong');
        };
    }
);