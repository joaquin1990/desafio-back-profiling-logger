import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import viewsRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import config from "./config/config.js";
import logger from "./middlewares/logger.winston.js";
import moment from "moment";

const app = express();
const connection = mongoose.connect(
  "mongodb+srv://joaquingarese:1a2b3c@cluster0.dcv0epl.mongodb.net/?retryWrites=true&w=majority",
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Atlas DB connected");
    }
  }
);
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://joaquingarese:1a2b3c@cluster0.dcv0epl.mongodb.net/?retryWrites=true&w=majority",
      ttl: 600,
    }),
    secret: "C0derxSessi0n3000",
    resave: false,
    saveUninitialized: false,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter);

const date = new moment().format("DD/MM/YYYY HH:mm:ss");
const PORT = config.app.PORT || 8080;

const server = app.listen(PORT, () => {
  logger.log("info", `${date} Listening on ${PORT}`);
});
