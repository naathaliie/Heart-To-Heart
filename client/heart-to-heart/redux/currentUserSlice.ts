import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//SPARAS BARA HÄR OCH INTE I DB

// Initialt state
const initialUserState = {
  currentUser: null as User | null, // Aktuell användare
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: initialUserState,
  reducers: {
    // Action för att uppdatera currentUser
    updateCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload; // Uppdaterar state med den nya användaren eller null
    },
  },
});

// Exportera action
export const { updateCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
