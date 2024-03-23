import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startDate: "",
  endDate: "",
};

export const DateFilterForTransaction = createSlice({
  name: "dateFilter",
  initialState,
  reducers: {
    updateDate: (state, action) => {
      const { startDate, endDate } = action.payload;
      state.startDate = startDate;
      state.endDate = endDate;
    },
  },
});

export const { updateDate } = DateFilterForTransaction.actions;
export default DateFilterForTransaction.reducer;
