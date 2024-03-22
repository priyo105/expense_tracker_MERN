import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

export const CategoryFilter = createSlice({
  name: "categoryFilter",
  initialState,
  reducers: {
    updateCategoryTransactionFilter: (state, action) => {
      console.log("sadadas", action.payload);
      state.categories = action.payload;
    },
  },
});

export const { updateCategoryTransactionFilter } = CategoryFilter.actions;

export default CategoryFilter.reducer;
