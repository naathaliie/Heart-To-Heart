import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import currentUserReducer from "../redux/currentUserSlice";
import categoryReducer from "../redux/categorySlice";
import levelReducer from "../redux/levelSlice";
import currentLevelReducer from "../redux/currentLevel";

export const store = configureStore({
  reducer: {
    users: userReducer,
    currentUser: currentUserReducer,
    levels: levelReducer,
    currentLevel: currentLevelReducer,
    categories: categoryReducer,
  },
});

// Skapa typer för att hjälpa TypeScript att förstå state och dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
