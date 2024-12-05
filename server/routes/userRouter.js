import dotenv from "dotenv";
import Express from "express";
import { zodUserSchema } from "../zodSchemas/zodUserSchema.js";
import { userModel } from "../dataBase/mongooseModels/userSchema.js";

// Ladda miljövariabler från .env-filen
dotenv.config();

export function userRouter(){
    const router = Express.Router();

//Hämta alla användare
router.get("/", async (req, res) => {
    try {
        const data = await userModel.find({});
        res.status(200).send(data);
    } catch (error) {
        console.log("error...");
        res.sendStatus(404);
        res.end(); // Avslutar responsen
    }
});

// Skapa en ny användare (signup)
    router.post("/signup", async (req, res) => {
        const { username } = req.body;

        // Validera användardata med Zod
        const zodResult = zodUserSchema.safeParse(req.body);

        if (!zodResult.success) {
            return res.status(400).json({
                message: "Zod-validering misslyckades",
                errors: zodResult.error.errors,
            });
        }

        
        try {
            // Kolla om användarnamnet redan finns
            const existingUser = await userModel.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: "Användarnamnet är redan taget" });
            }

            // Skapa en ny användare utan lösenord
            const newUser = await userModel.create({
                username,
                likedQuestions: [],  // En tom array för gillade frågor
                createdQuestions: [] // En tom array för skapade frågor
            });

            // Skicka tillbaka den ny skapade användaren
            res.status(201).json({ message: "Användare skapad", user: newUser });
        } catch (error) {
            res.status(500).json({ message: "Serverfel vid skapande av användare", error: error.message });
        }
    });

// Logga in användare
router.post("/login", async (req, res) => {
    const { username } = req.body; // Ta emot användarnamnet från requesten

    try {
        // Hitta användaren i databasen
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "Användaren hittades inte" });
        }

        // Skapa en JWT-token för användaren
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES });

        // Skicka tillbaka token och användarinformation (utan lösenord)
        res.status(200).json({
            message: "Inloggningen lyckades",
            token,
            user: { id: user._id, username: user.username },
        });
    } catch (error) {
        res.status(500).json({ message: "Serverfel vid inloggning", error: error.message });
    }
});

    return router;
};