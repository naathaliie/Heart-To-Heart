import Mongoose from "mongoose";

//Funktion för att kunna connecta till databasen
export async function connectToDataBase(){
    await Mongoose.connect("mongodb://localhost:27017/");
};