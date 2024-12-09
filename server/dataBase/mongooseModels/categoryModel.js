import Mongoose from "mongoose";

// Kategori-schemat
const categorySchema = new Mongoose.Schema({
    title: { type: String, required: true },  // Kategori titel (t.ex. "Lek och Bus")
    description: { type: String, required: true },  // Kategori beskrivning
    levelType: { type: String, required: true }  // Nivåtyp (t.ex. "Mellanstadie")
});

export const categoryModel = Mongoose.model("Category", categorySchema);
