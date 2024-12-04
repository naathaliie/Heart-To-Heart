import Mongoose from "mongoose";

// Funktion för att kunna connecta till databasen
export async function connectToDataBase() {
    try {
        // Försök att koppla upp till databasen
        await Mongoose.connect("mongodb://localhost:27017/");
        console.log("Successfully connected to the database");
    } catch (error) {
        // Om det uppstår ett fel, logga det och hantera det
        console.error("Error connecting to the database:", error.message);
        process.exit(1); // Avsluta processen om anslutningen misslyckas
    }
}
