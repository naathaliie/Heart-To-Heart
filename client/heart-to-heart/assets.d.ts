/*  assets.d.ts
Denna deklaration talar om för TypeScript att hantera .ttf (TrueType Font) filer
som moduler och returnera filens sökväg som en string. Detta behövs eftersom TypeScript
inte känner igen .ttf-filer som vanliga moduler utan denna deklaration.
Efter att denna fil lagts till kan vi importera .ttf-filer och använda dem för att ladda fonter. */

declare module "*.ttf" {
  const value: string; // Här anger vi att .ttf-filen kommer att vara en string (sökväg)
  export default value; // Vi exporterar värdet (sökvägen till .ttf-filen)
}
