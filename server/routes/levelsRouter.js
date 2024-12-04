import Express from "express";
import { levelModel } from "../dataBase/mongooseModels/levelModel.js";
import { zodLevelSchema } from "../zodSchemas/zodLevelSchema.js";

export function levelsRouter(){
    const router = Express.Router(); // Skapar en ny Express-router

    //Hämtqa alla levels från databasen
    router.get("/", async (req, res) => {
        try {
            const data = await levelModel.find({});
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
        const zodResult = zodLevelSchema.safeParse(req.body);

        //Om zod-valideringen INTE lyckades
        if (!zodResult.success) {
            return res.status(400).json({
                message: "Zod-validreingsfel när du skulle posta till levels",
                errors: zodResult.error.errors, //fel från zod
            });
        }

        // Om Zod-validering lyckas, skicka datan till Mongoose
        try {
            const request = await levelModel.create(zodResult.data); // Mongoose skapar dokumentet
            request.save();
            res.status(201).send(request);
        } catch (error) {
            res.sendStatus(500).json({
                message: "Ett fel inträffade när datan skulle sparas.",
                error: error.message, // Fel från Mongoose 
            });
        }
    });


    return router; // Returnerar routern så att den kan användas i appen

    //Lägg till fler CRUDS vid behov. I nuläget vill jag bara kunna hämta dem som redan finns i DB
};