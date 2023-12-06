import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../api/projects/category";
const initialState = {
  value: [],
};
export const setCategories = createAsyncThunk(
  "categories/setCategories",
  async (_, { fulfillWithValue}) => {
      const { categories } = await getCategories();
      return fulfillWithValue(categories);
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: {
    [setCategories.fulfilled]: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default categoriesSlice.reducer;
