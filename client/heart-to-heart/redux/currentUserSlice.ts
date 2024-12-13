import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//SPARAS BARA LOKALT OCH INTE I DB

const initialUserState = {
  currentUser: null as User | null,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: initialUserState,
  reducers: {
    updateCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { updateCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
