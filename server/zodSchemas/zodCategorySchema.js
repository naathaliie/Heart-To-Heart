import {z} from "zod";

export const zodCategorySchema = z.object({
    title: z.string(),
    description: z.string(),
    levelType: z.string(),
});