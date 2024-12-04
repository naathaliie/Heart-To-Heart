import Mongoose from "mongoose";

// Kategori-schemat
const categorySchema = new Mongoose.Schema({
    title: { type: String, required: true },  // Kategori titel (t.ex. "Lek och Bus")
    description: { type: String, required: true },  // Kategori beskrivning
    levels: [{  // Array av ObjectIds som refererar till flera nivåer
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Level"  // Referring till "Level" modell
    }],
    questions: [{  // Array av ObjectIds som refererar till flera frågor
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Question"  // Referring till "Question" modell
    }]
});

// Exportera kategorimodellen
export const categoryModel = Mongoose.model("Category", categorySchema);
