const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config({ path: "./config/.env" });
const connect = process.env.PORT;
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user.route");
const alertRoute = require("./routes/alert.route");

connectDB();

const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type", "Authorization"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: false,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", userRoute);
app.use("/alert", alertRoute);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.listen(connect, () => {
  console.log(`Le serveur démarre sur le port ${connect}`);
});
