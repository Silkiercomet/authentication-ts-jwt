import express from "express";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import cors from "cors"
import dotenv from "dotenv"
import extractStringEnvVar from "./controllers/extractEnv";
import db from "./db/db";
import router from "./routes/authRoutes";
import strategyPassport from "./controllers/passport";
import { errorHandler } from "./controllers/errorHandler";

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
dotenv.config({path:"./config.env"})
app.use(session({
    secret:extractStringEnvVar("JWT"),
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({
        mongoUrl: extractStringEnvVar("MONGO_URL"),
        ttl : 60 * 60
    })
}))
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
    res.send("<h1>hello world</h1>");
});
app.use("/api/auth", router)
app.use(errorHandler)
app.listen(extractStringEnvVar("PORT") || 3000, () => {
    try{
        db()
        strategyPassport(passport)
        console.log("server connected to port" + extractStringEnvVar("PORT"))
    } catch(err){
        console.log(err)
    }
})