import {z} from "zod";
import { zodQuestionSchema } from "./zodQuestionSchema.js";

export const zodUserSchema = z.object({
    username: z.string().min(3),  // Minst 3 tecken för användarnamn
    createdQuestions: z.array(zodQuestionSchema), // Array av kompletta frågeobjekt
    likedQuestions: z.array(zodQuestionSchema),   // Array av kompletta frågeobjekt
});