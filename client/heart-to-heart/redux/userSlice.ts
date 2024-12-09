import { addNewUser, fetchUsers } from "@/API/api";
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
      });
  },
});

export default usersSlice.reducer;
