import { NewUser } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Nuvarande IP4-adress
const currentIP: string = "192.168.100.17";

/*****USERS*****/
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

/*****LEVELS*****/
//Hämta alla levels
export const fetchLevels = createAsyncThunk("levels/fetchLevels", async () => {
  const response = await axios.get(`http://${currentIP}:3003/levels`);
  return response.data; // Data som returnerades ifrån API
});

/*****CATEGORIES*****/
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(`http://${currentIP}:3003/categories`);
    return response.data; // Data som returnerades ifrån API
  }
);

/*****QUESTIONS*****/
//Hämta alla questions
export const fetchQuestions = createAsyncThunk(
  "questions/fetchquestions",
  async () => {
    const response = await axios.get(`http://${currentIP}:3003/questions`);
    return response.data; // Data som returnerades ifrån API
  }
);
