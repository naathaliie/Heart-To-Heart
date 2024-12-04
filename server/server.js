import Express from "express";
import { testRouter } from "./routes/testRuoter.js";
import { connectToDataBase } from "./dataBase/connectToDataBase.js";

const app = Express();
const port = 3003;

//testArray
const testArray = [
    {
        name: 'nattis',
        is: 'bäst',
    },
    {
        name: 'jontis',
        is: 'näst bäst'
    }
];

app.use(Express.json());

//Koppla upp mot databasen för ALLA resurser
app.use("*", async (req, res, next) => {
    await connectToDataBase();
    next();
});

//Få tillgång till alla routes
app.use("/test", testRouter());



app.listen(port,() => {
    console.log(`port is running on ${port}`);
});


/* //Hämta ALLA
app.get("/", (req, res) => {
    res.send(testArray);
})

//Posta till ALLA
app.post("/", (req, res) => {
 //Använd safeParse för att validera indatan på ett mer elegant sätt än med bara parse
 const result = testSchema.safeParse(req.body);
 
 if (result.success) {
    //Om valideringen lyckas, lägg till den nya resursen i testArrayen
    testArray.push(result.data);

    //Ge tillbaka resursen som ett svar (för att bekräfta att det gick) med status 201
    res.status(201).json({
        message: "Datan var giltig och har nu sparats!",
        data: result.data,
    });
 } else {
    //Om valideringen misslyckades, skicka en 400-status med felmeddelande
    res.status(400).json({
        message: 'Valideringsfel',
        errors: result.error.errors // Detta innehåller specifika felmeddelanden från zod
    });
 }
}) */