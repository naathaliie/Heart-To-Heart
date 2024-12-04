import {z, ZodSchema} from "zod";

// Skapa ett schema för att validera ett korrekt MongoDB ObjectId (24 hexadecimala tecken)
export const zodIDSchema = z.string().regex(/^[a-f\d]{24}$/i, "Ogiltigt ID-format");

/* Fördelar med att använda Zod i en GET med medskickat ID:
Ökad säkerhet: 
Genom att validera ID:t innan du använder det i en databasfråga kan du undvika potentiella fel eller angrepp (t.ex. genom att förhindra att ogiltiga ID:n används).

Färre buggar: 
Det gör att du kan fånga problem tidigt, vilket gör det lättare att felsöka och hålla din kod robust.

Enkel att återanvända: 
Genom att ha Zod-schemat för ID-validering i en separat fil kan du återanvända samma schema i olika delar av din applikation där du behöver validera ID:n. */