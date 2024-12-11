import { NewLike, NewUser, Question } from "@/types";
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
    return response.data; // Returnera den nya användaren
  }
);
//Lägg till en gillad fråga
export const addLikedQuestion = createAsyncThunk(
  "users/addNewLike",
  async ({
    userId,
    newFavoritQuestion,
  }: {
    userId: string;
    newFavoritQuestion: Question;
  }) => {
    // Logga frågeobjektet och userId som skickas till backend
    console.log("Fråga som skickas till backend:", newFavoritQuestion);
    console.log("UserId som skickas till backend:", userId);

    //HÄR GÅR DET FEL
    try {
      const response = await axios.post(
        `http://${currentIP}:3003/users/${userId}/likedQuestions`,
        newFavoritQuestion // Skicka hela frågeobjektet
      );
      return response.data;
    } catch (error) {
      console.error("Error adding liked question:", error);
      throw error;
    }
  }
);

//Ta bort en gillad fråga
export const deleteLikedQuestion = createAsyncThunk(
  "users/deleteLike",
  async ({ userId, questionId }: { userId: string; questionId: string }) => {
    try {
      const response = await axios.delete(
        `http://${currentIP}:3003/user/${userId}/likedQuestions/${questionId}` // Skickar questionId i URL
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting liked question:", error);
      throw error;
    }
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
