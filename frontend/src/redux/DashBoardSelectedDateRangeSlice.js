import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dateRange: "",
};
export const DateRangeSlice = createSlice({
  name: "dateRange",
  initialState,
  reducers: {
    updateDateRange: (state, action) => {
      console.log(action.payload);
      state.dateRange = action.payload;
    },
  },
});

export const { updateDateRange } = DateRangeSlice.actions;

export default DateRangeSlice.reducer;
