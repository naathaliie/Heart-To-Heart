import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

// Skapa typer för att hjälpa TypeScript att förstå state och dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
