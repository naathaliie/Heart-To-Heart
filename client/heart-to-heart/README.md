# Om projektet

Heart to heart är en individuell inlämningsuppgift i kursen Apputveckling, skapad av Nathalie Larsson i klass Frontend23.

Appens syfte är att fungera som en digital frågelåda som gör det enklare att kommunicera och skapa närhet i vardagens små stunder. Stora samtal börjar med små frågor!

## Installation

Innan du kan starta appen behöver du klona repot och installera de nödvändiga dependencies som projektet behöver.

Så här gör du:

1. Installera dependencies i respektive mapp, Client -och i Server-mappen

   ```bashs
   npm install
   ```

## Starta programmet

1. Starta servern ifrån mappen server

   ```bash
    node server.js
   ```

2. Starta Appen ifrån mappen client-> heart-to-heart

   ```bash
    npx expo start
   ```

I mappen API finns filen api.ts. På rad 6 behöver du uppdatera till korrekt ip-adress.
Din ip-adress hittar du genom att skriva in Ipconfig i en kommandoterminal, leta upp raden som heter IPv4 och byt ut variabeln currentIP till din ip
