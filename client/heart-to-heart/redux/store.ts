import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import currentUserReducer from "../redux/currentUserSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    currentUser: currentUserReducer,
  },
});

// Skapa typer för att hjälpa TypeScript att förstå state och dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
