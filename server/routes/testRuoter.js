import Express from "express";
import { testModel } from "../dataBase/mongooseModels/testModel.js";
import { zodTestSchema } from "../zodSchemas/zodTestSchema.js";
import { zodIDSchema } from "../zodSchemas/zod-ID-scema.js";
import { zodPartialTestSchema } from "../zodSchemas/zodPartialSchema.js";

// Exporterar en funktion som skapar och returnerar en ny router
export function testRouter(){
    const router = Express.Router(); // Skapar en ny Express-router

    // Hämta alla dokument i databasen
    router.get("/", async (req, res) => {
        try {
            const data = await testModel.find({});
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
        const zodResult = zodTestSchema.safeParse(req.body);

        //Om zod-valideringen INTE lyckades
        if (!zodResult.success) {
            return res.status(400).json({
                message: "Zod-validreingsfel när du skulle posta till test",
                errors: zodResult.error.errors, //fel från zod
            });
        }

        // Om Zod-validering lyckas, skicka datan till Mongoose
        try {
            const request = await testModel.create(zodResult.data); // Mongoose skapar dokumentet
            request.save();
            res.status(201).send(request);
        } catch (error) {
            res.sendStatus(500).json({
                message: "Ett fel inträffade när datan skulle sparas.",
                error: error.message, // Fel från Mongoose 
            });
        }
    });

    // Hämta ett specifikt dokument baserat på ID.
    router.get("/:id", async (req, res) => {
    // Validera att ID:t är ett korrekt MongoDB ObjectId med zod för att öka säkerheten
    const idValidation = zodIDSchema.safeParse(req.params.id);

    if (!idValidation.success) {
        return res.status(400).json({
            message: "Ogiltigt ID",
            errors: idValidation.error.errors,
        });
    }

    try {
        const data = await testModel.findOne({ _id: req.params.id });
        if (!data) {
            return res.status(404).json({ message: "Dokumentet hittades inte" });
        }
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ message: "Serverfel", error: error.message });
    }
      });

    // Uppdatera ett specifikt dokument baserat på ID
    router.patch("/:id", async (req, res) => {

        //TA BORT SEDAN
        console.log("Request body:", req.body);  // Logga inkommande body

        // Validera endast de fält som är med i req.body (partialTestSchema gör att alla fält blir valbara ifrån schemat testSchema för att användaren skall kunna välja vad som skall ändras och inte behöva ändra på allt)
        const validationResult = zodPartialTestSchema.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                message: "Zod-valideringsfel vid uppdatering",
                errors: validationResult.error.errors,
            });
        }

        try {
            // Uppdatera fält baserat på validerad data
            const data = await testModel.findOneAndUpdate(
                { _id: req.params.id }, // Hitta dokumentet baserat på ID
                validationResult.data,   // Uppdatera med validerad data
                { new: true }            // Returnera det uppdaterade dokumentet
            );

            if (!data) {
                return res.status(404).json({ message: "Dokumentet hittades inte" });
            }

            res.status(200).send(data);
        } catch (error) {
            console.error("Error during PATCH:", error);  // Logga eventuellt serverfel TA BORT?
            res.status(500).json({ message: "Serverfel vid uppdatering", error: error.message });
        }
    });

    // Radera ett specifikt dokument baserat på ID
    router.delete("/:id", async (req, res) => {
        // Validera att ID:t är ett korrekt MongoDB ObjectId med Zod för att öka säkerheten
        const idValidation = zodIDSchema.safeParse(req.params.id);
    
        if (!idValidation.success) {
            return res.status(400).json({
                message: "Ogiltigt ID",
                errors: idValidation.error.errors,
            });
        }
    
        try {
            // Försök att ta bort dokumentet baserat på ID
            const data = await testModel.deleteOne({ _id: req.params.id });
            
            if (data.deletedCount === 0) {
                return res.status(404).json({ message: "Dokumentet hittades inte" });
            }
    
            res.status(200).json({ message: "Dokumentet raderades framgångsrikt" });
        } catch (error) {
            res.status(500).json({ message: "Serverfel vid radering", error: error.message });
        }
    });

    return router; // Returnerar routern så att den kan användas i appen
};