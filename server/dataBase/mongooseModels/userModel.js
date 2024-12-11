import Mongoose from "mongoose";

// Definiera ett schema för användaren
const userSchema = new Mongoose.Schema({
    username: { type: String, required: true, unique: true },
    likedQuestions: [
        {
            _id: { type: Mongoose.Schema.Types.ObjectId, required: true },
            questionText: { type: String, required: true },
            categoryType: { type: String, required: true }
        }
    ], // Frågor som användaren gillar
    createdQuestions: [
        {
        _id: { type: Mongoose.Schema.Types.ObjectId, required: true },
        questionText: { type: String, required: true },
        categoryType: { type: String, required: true }
        } 
    ] // Frågor som användaren har skapat
});

// Skapa en Mongoose-modell för användaren baserat på schemat
export const userModel = Mongoose.model("User", userSchema);
