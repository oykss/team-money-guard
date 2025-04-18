import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [
    {
      id: "1",
      date: "04.01.23",
      type: "-",
      category: "Other",
      comment: "Gift for your wife",
      sum: 300,
    },
    {
      id: "2",
      date: "05.01.23",
      type: "+",
      category: "Salary",
      comment: "January payment",
      sum: 1500,
    },
  ],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {},
});

export default transactionsSlice.reducer;
