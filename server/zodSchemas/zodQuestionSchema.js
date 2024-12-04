import {z} from "zod";

export const zodQuestionSchema = z.object({
    questionText: z.string(),
    categories: z.array(z.string().length(24))  // Array av strängar som representerar ObjectId (24 tecken långa) för att en kategori kan höra till flera levels
});