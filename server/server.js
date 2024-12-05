import Express from "express";
import { testRouter } from "./routes/testRuoter.js";
import { connectToDataBase } from "./dataBase/connectToDataBase.js";
import { levelsRouter } from "./routes/levelsRouter.js";
import { categoriesRouter } from "./routes/categoriesRouter.js";
import { questionsRouter } from "./routes/questionsRouter.js";
import { userRouter } from "./routes/userRouter.js";

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

//Få tillgång till alla endpoints
app.use("/test", testRouter());
app.use("/users", userRouter());
app.use("/levels", levelsRouter());
app.use("/categories", categoriesRouter());
app.use("/questions", questionsRouter());



app.listen(port,() => {
    console.log(`port is running on ${port}`);
});



