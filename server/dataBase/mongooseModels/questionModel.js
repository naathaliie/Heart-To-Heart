import Mongoose from "mongoose";

// Fråga-schemat
const questionSchema = new Mongoose.Schema({
    questionText: { type: String, required: true },  // Själva frågan
    categoryType: { type: String, required: true }  // Kategorityp (t.ex. "Lek och Bus")
});

export const questionModel = Mongoose.model("Question", questionSchema);
