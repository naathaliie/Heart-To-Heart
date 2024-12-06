import { NewUser, User } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//LÄGG I EN EGEN MAPP MED ALLA CRUDs
const currentIP: string = "192.168.100.17";
//Hämta alla users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(`http://${currentIP}:3003/users`);
  return response.data; // Data som returnerades ifrån API
});
//Lägg till ny user
export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  async (newUser: NewUser) => {
    const response = await axios.post(
      `http://${currentIP}:3003/users/signup`,
      newUser
    );
    console.log(
      "response.data alltså den nya användaren ser nu ut så här: ",
      response.data
    );
    return response.data; // Returnera den nya användaren
  }
);
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
