import { Category } from "@/types";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
//SPARAS BARA HÄR OCH INTE I DB

// Initialt state
const initialCategoryState = {
  currentCategory: null as Category | null, // Aktuell nivå
};

const currentCategorySlice = createSlice({
  name: "currentCategory",
  initialState: initialCategoryState,
  reducers: {
    // Action för att uppdatera currentLevel
    updateCurrentCategory: (state, action: PayloadAction<Category | null>) => {
      state.currentCategory = action.payload; // Uppdaterar state med den nya nivån eller null
    },
  },
});

// Exportera action
export const { updateCurrentCategory } = currentCategorySlice.actions;

export default currentCategorySlice.reducer;
