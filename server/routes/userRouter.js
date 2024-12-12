import dotenv from "dotenv";
import Express from "express";
import { zodUserSchema } from "../zodSchemas/zodUserSchema.js";
import { userModel } from "../dataBase/mongooseModels/userModel.js";
import jwt from "jsonwebtoken"; // Importera jsonwebtoken
import Mongoose, { Types } from "mongoose";
import { questionModel } from "../dataBase/mongooseModels/questionModel.js";
import { zodQuestionSchema } from "../zodSchemas/zodQuestionSchema.js";

// Ladda miljövariabler från .env-filen
dotenv.config();

export function userRouter() {
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
        return res
          .status(400)
          .json({ message: "Användarnamnet är redan taget" });
      }

      // Skapa en ny användare utan lösenord
      const newUser = await userModel.create({
        username,
        likedQuestions: [], // En tom array för gillade frågor
        createdQuestions: [], // En tom array för skapade frågor
      });

      // Skicka tillbaka den ny skapade användaren
      res.status(201).json({ message: "Användare skapad", user: newUser });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Serverfel vid skapande av användare",
          error: error.message,
        });
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
      const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRES,
      });

      // Skicka tillbaka token och användarinformation (utan lösenord)
      res.status(200).json({
        message: "Inloggningen lyckades",
        token,
        user: { id: user._id, username: user.username },
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Serverfel vid inloggning", error: error.message });
    }
  });

  //Lägga till en gillad fråga till en användare
  router.post("/:userId/likedQuestions", async (req, res) => {
    const { userId } = req.params; // Hämta användarens ID från URL:en
    const question = req.body; // Förvänta att hela frågeobjektet skickas i body
    console.log("FRÅN USERROUTER, MEDSKICKAD FRÅGA", req.body);
    console.log("FRÅN USERROUTER, MEDSKICKAD USER", userId);

    // Validera frågeobjektet med Zod
    const zodResult = zodQuestionSchema.safeParse(question);

    if (!zodResult.success) {
      return res.status(400).json({
        message: "Zod-validering misslyckades",
        errors: zodResult.error.errors,
      });
    }

    try {
      // Hitta frågan i databasen baserat på _id
      const existingQuestion = await questionModel.findById(question._id);
      if (!existingQuestion) {
        return res.status(404).json({ message: "Frågan hittades inte" });
      }

      // Hitta användaren i databasen
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Användaren hittades inte" });
      }

      // Kontrollera om frågan redan är gillad
      if (user.likedQuestions.some((q) => q._id.toString() === question._id)) {
        return res
          .status(400)
          .json({ message: "Frågan är redan gillad av användaren" });
      }

      // Lägg till frågan i `likedQuestions`
      user.likedQuestions.push({
        _id: existingQuestion._id,
        questionText: existingQuestion.questionText,
        categoryType: existingQuestion.categoryType,
      });

      await user.save(); // Spara ändringarna i databasen

      res
        .status(200)
        .json({ message: "Frågan har lagts till i gillade frågor", user });
    } catch (error) {
      console.error("Error adding liked question:", error);
      res
        .status(500)
        .json({ message: "Ett serverfel inträffade", error: error.message });
    }
  });

  // Ta bort en gillad fråga
  router.delete("/:userId/likedQuestions/:questionId", async (req, res) => {
    const { userId, questionId } = req.params;

    // Kontrollera att questionId är ett giltigt ObjectId
    if (!Mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).json({ message: "Ogiltigt question-ID" });
    }

    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Användaren hittades inte" });
      }

      // Filtrera bort frågan baserat på dess _id
      const initialLength = user.likedQuestions.length;
      user.likedQuestions = user.likedQuestions.filter(
        (q) => q._id.toString() !== questionId
      );

      if (user.likedQuestions.length === initialLength) {
        return res
          .status(400)
          .json({ message: "Frågan är inte gillad av användaren" });
      }

      await user.save(); // Spara ändringarna i databasen

      res
        .status(200)
        .json({ message: "Frågan har tagits bort från gillade frågor", user });
    } catch (error) {
      console.error("Error removing liked question:", error);
      res
        .status(500)
        .json({ message: "Ett serverfel inträffade", error: error.message });
    }
  });

  //Se en användares gillade frågor
  router.get("/:userId/likedQuestions", async (req, res) => {
    const { userId } = req.params; // Hämta användarens ID från URL:en
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
      res
        .status(500)
        .json({
          message: "Serverfel vid hämtning av gillade frågor",
          error: error.message,
        });
    }
  });

  //Hämta alla egna frågor
  router.get("/:userId/createdQuestions", async (req, res) => {
    const { userId } = req.params; // Hämta användarens ID från URL:en
    try {
      // Hitta användaren och populera createdQuestions (populate innebär att du hämtar något från ett dokument)
      const user = await userModel
        .findById(userId)
        .populate("createdQuestions");
      if (!user) {
        return res.status(404).json({ message: "Användaren hittades inte" });
      }
      // Skicka tillbaka de gillade frågorna
      res.status(200).json(user.createdQuestions);
    } catch (error) {
      console.error("Error fetching liked questions:", error);
      res
        .status(500)
        .json({
          message: "Serverfel vid hämtning av gillade frågor",
          error: error.message,
        });
    }
  });

  //Posta en fråga
  router.post("/:userId/createdQuestions", async (req, res) => {
    const { userId } = req.params; // Hämta användarens ID från URL:en
    const question = req.body; // Förvänta att hela frågeobjektet skickas i body

    // Validera frågeobjektet med Zod
    const zodResult = zodQuestionSchema.safeParse(question);

    if (!zodResult.success) {
      return res.status(400).json({
        message:
          "Zod-validering misslyckades när du skulle skapa en egen fråga",
        errors: zodResult.error.errors,
      });
    }
    // Om Zod-validering lyckas, verifiera annvändaren och skicka datan till Mongoose
    try {
      // Hitta användaren i databasen
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Användaren hittades inte" });
      }

      // Lägg till ett genererat _id
      const newQuestion = { ...zodResult.data, _id: new Types.ObjectId() };
      user.createdQuestions.push(newQuestion);

      await user.save(); // Spara ändringarna i databasen

      res
        .status(201)
        .json({ message: "Frågan har lagts till i dina egna frågor", user });
    } catch (error) {
      console.error("Error adding created question:", error);
      res
        .status(500)
        .json({ message: "Ett serverfel inträffade", error: error.message });
    }
  });

  //Radera en fråga

  return router;
}
