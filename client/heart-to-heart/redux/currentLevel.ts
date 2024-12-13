import { Level } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//SPARAS BARA LOKALT OCH INTE I DB

const initialLevelState = {
  currentLevel: null as Level | null,
};

const currentLevelSlice = createSlice({
  name: "currentLevel",
  initialState: initialLevelState,
  reducers: {
    updateCurrentLevel: (state, action: PayloadAction<Level | null>) => {
      state.currentLevel = action.payload;
    },
  },
});

export const { updateCurrentLevel } = currentLevelSlice.actions;

export default currentLevelSlice.reducer;
