import {z} from "zod";

export const zodTestSchema = z.object({
    name: z.string(),
    is: z.string(),
});