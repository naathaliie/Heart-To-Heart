import { Category } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//SPARAS BARA LOKALT OCH INTE I DB

const initialCategoryState = {
  currentCategory: null as Category | null,
};

const currentCategorySlice = createSlice({
  name: "currentCategory",
  initialState: initialCategoryState,
  reducers: {
    updateCurrentCategory: (state, action: PayloadAction<Category | null>) => {
      state.currentCategory = action.payload;
    },
  },
});

export const { updateCurrentCategory } = currentCategorySlice.actions;

export default currentCategorySlice.reducer;
