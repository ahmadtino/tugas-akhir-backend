import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize"
import UserRoute from "./routes/UserRoute.js";
import EdataRoute from "./routes/EdataRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import WeatherRoute from "./routes/WeatherRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
})

const dbSync = async()=>{
    await db.sync({ alter: true });
};

dbSync();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({ credentials: true,  origin: [process.env.ORIGIN_1, process.env.ORIGIN_2]}));
app.use(express.json());
app.use(UserRoute);
app.use(EdataRoute);
app.use(AuthRoute);
app.use(WeatherRoute);

// store.sync();

app.listen(process.env.PORT, () => {
    console.log('Server up and running...');
});