require("dotenv").config();
require("./loggers");
const express = require("express");
const connectMongoDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const appRoutes = require("./routes/appRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());
connectMongoDB();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "X-Amz-Date",
    "Authorization",
    "X-Api-Key",
    "X-Amz-Security-Token",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/application", appRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the asset finance specialist server!");
});

module.exports = app;
