import Mongoose from "mongoose";

const testSchema = new Mongoose.Schema({
    name: {type: String, required: true},
    is: {type: String, reguired: true,},
});

export const testModel = Mongoose.model("Test", testSchema);