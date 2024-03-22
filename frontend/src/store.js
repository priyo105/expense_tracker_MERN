import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./redux/counterSlicetest";
import LoginInfoSlice from "./redux/LoginInfoSlice";
import DateRangeSlice from "./redux/DashBoardSelectedDateRangeSlice";
import CategoryFilterForTransactionSlice from "./redux/CategoryFilterForTransactionSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    loginInfo: LoginInfoSlice,
    dateRange: DateRangeSlice,
    categoryFilter: CategoryFilterForTransactionSlice,
  },
});
