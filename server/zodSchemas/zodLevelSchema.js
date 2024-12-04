import {z} from "zod";

export const zodLevelSchema = z.object({
    level: z.string(),
    description: z.string(),
});