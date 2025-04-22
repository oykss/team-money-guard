import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../service/index";

export const fetchStatistics = createAsyncThunk(
    'statistics/fetchStatistics',
    async (_, thunkAPI) => {
        try {
            const response = await api.get(`/transactions/`);
            return response.data.data.data;
        } catch (error) {
            thunkAPI.rejectWithValue(error.response.data.message || 'Something went wrong');
        };
    }
);