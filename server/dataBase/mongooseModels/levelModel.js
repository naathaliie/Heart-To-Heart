import Mongoose from "mongoose";

const levelSchema = new Mongoose.Schema({
    level: {type: String, required: true},
    description: {type: String, required: true},
});

export const levelModel = Mongoose.model("Level", levelSchema);