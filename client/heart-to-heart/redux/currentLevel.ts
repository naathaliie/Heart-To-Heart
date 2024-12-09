import { Level } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//SPARAS BARA HÄR OCH INTE I DB

// Initialt state
const initialLevelState = {
  currentLevel: null as Level | null, // Aktuell nivå
};

const currentLevelSlice = createSlice({
  name: "currentLevel",
  initialState: initialLevelState,
  reducers: {
    // Action för att uppdatera currentLevel
    updateCurrentLevel: (state, action: PayloadAction<Level | null>) => {
      state.currentLevel = action.payload; // Uppdaterar state med den nya nivån eller null
    },
  },
});

// Exportera action
export const { updateCurrentLevel } = currentLevelSlice.actions;

export default currentLevelSlice.reducer;
