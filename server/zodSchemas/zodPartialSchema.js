import { zodTestSchema } from './zodTestSchema.js';  // Importera det ursprungliga schemat

// Skapa ett partiellt schema från det ursprungliga Zod-schemat
export const zodPartialTestSchema = zodTestSchema.partial();  // Alla fält blir valfria


/* Att använda ett partiellt Zod-schema vid PATCH-operationer har flera fördelar:

Flexibilitet: 
Användaren behöver bara skicka de fält de vill uppdatera, inte hela objektet, vilket gör API:t effektivare och enklare att använda.

Validering: 
Zod säkerställer att de fält som skickas är korrekta vad gäller typ och format, vilket förhindrar felaktig eller skadlig data.

Valfria fält:
Du kan definiera vilka fält som är valfria i Mongoose-schemat och bara validera de som faktiskt skickas med i förfrågan.

Modulär kod: 
Genom att bryta ut valideringslogik till separata filer blir koden mer strukturerad och lättare att underhålla.

Säkerhet: 
Zod skyddar mot felaktig data och ökar säkerheten genom att endast korrekt formaterad data accepteras.

Sammanfattningsvis gör partiell validering koden mer flexibel, säker och effektiv. */