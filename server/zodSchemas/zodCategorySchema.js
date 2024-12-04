import {z} from "zod";

export const zodCategorySchema = z.object({
    title: z.string(),
    description: z.string(),
    levels: z.array(z.string().length(24))  // Array av strängar som representerar ObjectId (24 tecken långa) för att en kategori kan höra till flera levels
});