import dotenv from "dotenv";
import Express from "express";
import { zodUserSchema } from "../zodSchemas/zodUserSchema.js";
import { userModel } from "../dataBase/mongooseModels/userModel.js";
import jwt from 'jsonwebtoken'; // Importera jsonwebtoken
import  Mongoose  from "mongoose";
import { questionModel } from "../dataBase/mongooseModels/questionModel.js";

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

//Lägga till en gillad fråga till en användare
router.post("/:userId/likedQuestions", async (req, res) => {
   
    const {userId} = req.params;  //Hämta användarens ID från URL:en
    const { questionId } = req.body; // Hämta frågans ID från request-body

    //Kontrollera att questionId är ett giltigt ObjectId
    if (!Mongoose.Types.ObjectId.isValid(questionId)) {
        return res.status(400).json({ message: "Ogiltigt question-ID" });
    }

    try {
        // Kontrollera om frågan existerar
        const questionExists = await questionModel.findById(questionId);
        if (!questionExists) {
            return res.status(404).json({ message: "Frågan hittades inte" });
        }

        // Hitta användaren i databasen
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Användaren hittades inte" });
        }

        // Kontrollera om frågan redan är gillad
        if (user.likedQuestions.includes(questionId)) {
            return res.status(400).json({ message: "Frågan är redan gillad av användaren" });
        }

        // Lägg till frågans ID till användarens `likedQuestions`
        user.likedQuestions.push(questionId);
        await user.save(); // Spara ändringarna i databasen

        res.status(200).json({ message: "Frågan har lagts till i gillade frågor", user });
    } catch (error) {
        console.error("Error adding liked question:", error);
        res.status(500).json({ message: "Ett serverfel inträffade", error: error.message });    }
  
});

//Se en användares gillade frågor
router.get("/:userId/likedQuestions", async (req, res) => {
    const {userId} = req.params; // Hämta användarens ID från URL:en
    try {
        // Hitta användaren och populera likedQuestions (populate innebär att du hämtar något från ett dokument)
        const user = await userModel.findById(userId).populate("likedQuestions");
        if (!user) {
            return res.status(404).json({ message: "Användaren hittades inte" });
        }
        // Skicka tillbaka de gillade frågorna
        res.status(200).json(user.likedQuestions);
    } catch (error) {
        console.error("Error fetching liked questions:", error);
        res.status(500).json({ message: "Serverfel vid hämtning av gillade frågor", error: error.message });
    }
});


// Lägg till en gillad fråga till en specifik användare
router.post("/:userId/likeQuestion", async (req, res) => {
    const { userId } = req.params; // Hämta användarens ID från URL:en
    const { questionId } = req.body; // Hämta frågans ID från request-body

try {
    // Hitta användaren i databasen
    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "Användaren hittades inte" });
    }

    // Kontrollera om frågan redan är gillad
    if (user.likedQuestions.includes(questionId)) {
        return res.status(400).json({ message: "Frågan är redan gillad av användaren" });
    }

    // Lägg till frågans ID till användarens `likedQuestions`
    user.likedQuestions.push(questionId);
    await user.save(); // Spara ändringarna i databasen

    res.status(200).json({ message: "Frågan har lagts till i gillade frågor", user });
} catch (error) {
    res.status(500).json({ message: "Ett serverfel inträffade", error: error.message });
}
});

    return router;
};