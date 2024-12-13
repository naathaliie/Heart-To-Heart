import { fetchQuestions } from "@/API/api";
import { Question } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [] as Question[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  //EXTRAREDUCERS FÖR ALL HANTERING MOT DB
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default questionsSlice.reducer;
