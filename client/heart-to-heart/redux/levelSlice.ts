import { fetchLevels } from "@/API/api";
import { Level } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const levelsSlice = createSlice({
  name: "levels",
  initialState: {
    levels: [] as Level[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  //EXTRAREDUCERS FÖR ALL HANTERING MOT DB
  extraReducers: (builder) => {
    builder
      .addCase(fetchLevels.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLevels.fulfilled, (state, action) => {
        state.loading = false;
        state.levels = action.payload;
      })
      .addCase(fetchLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default levelsSlice.reducer;
