import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import currentUserReducer from "./currentUserSlice";
import categoryReducer from "./categorySlice";
import levelReducer from "./levelSlice";
import currentLevelReducer from "./currentLevel";
import currentCategoryReducer from "./currentCategory";
import questionReducer from "./questionSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    currentUser: currentUserReducer,
    levels: levelReducer,
    currentLevel: currentLevelReducer,
    categories: categoryReducer,
    currentCategory: currentCategoryReducer,
    questions: questionReducer,
  },
});

// Skapa typer för att hjälpa TypeScript att förstå state och dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
