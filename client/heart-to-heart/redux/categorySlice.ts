import { fetchCategories } from "@/API/api";
import { Category } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [] as Category[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  //EXTRAREDUCERS FÖR ALL HANTERING MOT DB
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default categoriesSlice.reducer;
