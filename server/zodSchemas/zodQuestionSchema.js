import {z} from "zod";

export const zodQuestionSchema = z.object({
    questionText: z.string(),
    categoryType: z.string(),
});