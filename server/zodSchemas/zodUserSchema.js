import {z} from "zod";

export const zodUserSchema = z.object({
    username: z.string().min(3),  // Minst 3 tecken för användarnamn
    createdQuestions: z.array(z.string().length(24)), // Array av ObjectId:er (som strängar)
    likedQuestions: z.array(z.string().length(24))    // Array av ObjectId:er (som strängar)
});