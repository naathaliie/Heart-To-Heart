import Mongoose from "mongoose";

// Definiera ett schema för användaren
const userSchema = new Mongoose.Schema({
    username: { type: String, required: true, unique: true },
    likedQuestions: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Question" }], // Frågor som användaren gillar
    createdQuestions: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Question" }] // Frågor som användaren har skapat
});

// Skapa en Mongoose-modell för användaren baserat på schemat
export const userModel = Mongoose.model("User", userSchema);
