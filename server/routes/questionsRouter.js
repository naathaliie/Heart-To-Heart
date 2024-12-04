import Express from "express";
import { questionModel } from "../dataBase/mongooseModels/questionModel.js";
import { zodQuestionSchema } from "../zodSchemas/zodQuestionSchema.js";

// Exporterar en funktion som skapar och returnerar en ny router
export function questionsRouter(){
    const router = Express.Router();

     // Hämta alla dokument i databasen
     router.get("/", async (req, res) => {
        try {
            const data = await questionModel.find({});
            res.status(200).send(data);
        } catch (error) {
            console.log("error...");
            res.sendStatus(404);
            res.end(); // Avslutar responsen
        }
    });

    // Lägg till ett nytt dokument i databasen
    router.post("/", async (req, res) => {
        // Validera först med Zod INNAN datan skickas till databasen
        const zodResult = zodQuestionSchema.safeParse(req.body);

        //Om zod-valideringen INTE lyckades
        if (!zodResult.success) {
            return res.status(400).json({
                message: "Zod-validreingsfel när du skulle posta till questions",
                errors: zodResult.error.errors, //fel från zod
            });
        }

        // Om Zod-validering lyckas, skicka datan till Mongoose
        try {
            const request = await questionModel.create(zodResult.data); // Mongoose skapar dokumentet
            request.save();
            res.status(201).send(request);
        } catch (error) {
            res.sendStatus(500).json({
                message: "Ett fel inträffade när datan skulle sparas.",
                error: error.message, // Fel från Mongoose 
            });
        }
    });

    return router;
};