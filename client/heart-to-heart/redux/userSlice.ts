import {
  addLikedQuestion,
  addNewUser,
  deleteLikedQuestion,
  fetchAllFavoritQuestions,
  fetchUsers,
} from "@/API/api";
import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [] as User[], // Typa initialState
    loading: false,
    error: null as string | null, // Tillåter både string och null
  },
  reducers: {},
  //EXTRAREDUCERS FÖR ALL HANTERING MOT DB
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(addLikedQuestion.fulfilled, (state, action) => {
        const { userId, newFavoritQuestion } = action.payload;
        const user = state.users.find((user) => user._id === userId);
        if (user) {
          // Lägg till frågan i användarens likedQuestions
          user.likedQuestions.push(newFavoritQuestion);
        }
      })
      .addCase(deleteLikedQuestion.fulfilled, (state, action) => {
        // Hitta användaren som blev uppdaterad och ta bort frågan från likedQuestions
        state.users = state.users.map((user) => {
          if (user._id === action.payload._id) {
            // Ta bort den borttagna frågan från användarens likedQuestions
            user.likedQuestions = user.likedQuestions.filter(
              (question) => question._id !== action.payload.questionId
            );
          }
          return user;
        });
      })
      .addCase(fetchAllFavoritQuestions.fulfilled, (state, action) => {
        const userId = action.meta.arg; // Få userId från action via meta.arg
        const likedQuestions = action.payload;

        const user = state.users.find((user) => user._id === userId);
        if (user) {
          // Uppdatera användarens likedQuestions med de hämtade frågorna
          user.likedQuestions = likedQuestions;
        }
      });
  },
});

export default usersSlice.reducer;
