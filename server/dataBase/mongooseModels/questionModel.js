import Mongoose from "mongoose";

// Fråga-schemat
const questionSchema = new Mongoose.Schema({
    questionText: { type: String, required: true },
    categories: [{  // Array av ObjectIds som refererar till flera kategorier
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }]
});

// Exportera frågemodellen
export const questionModel = Mongoose.model("Question", questionSchema);
