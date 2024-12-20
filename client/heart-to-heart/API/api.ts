import { NewLike, NewQuestion, NewUser, Question } from "@/types";
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
        `http://${currentIP}:3003/users/${userId}/likedQuestions/${questionId}` // Skickar questionId i URL
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting liked question:", error);
      throw error;
    }
  }
);

//Hämta användarens alla gilladeFrågor
export const fetchAllFavoritQuestions = createAsyncThunk(
  "users/getAllLikedQuestions",
  async (userId: string) => {
    const response = await axios.get(
      `http://${currentIP}:3003/users/${userId}/likedQuestions`
    );
    return response.data;
  }
);

//Hämta användarens skapade frågor
export const fetchCreatedQuestions = createAsyncThunk(
  "users/fetchCreatedQuestions",
  async (userId: string) => {
    const response = await axios.get(
      `http://${currentIP}:3003/users/${userId}/createdQuestions`
    );
    return response.data;
  }
);

//Lägg till en användares skapade fråga

export const addNewCustomQuestion = createAsyncThunk(
  "users/addNewCustomQuestion",
  async ({
    userId,
    newCustomQuestion,
  }: {
    userId: string;
    newCustomQuestion: NewQuestion;
  }) => {
    console.log("Du är inne i addNewCustomUser från API");
    console.log("UserID som du skickar är: ", userId);
    const response = await axios.post(
      `http://${currentIP}:3003/users/${userId}/createdQuestions`,
      newCustomQuestion
    );
    return response.data;
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
