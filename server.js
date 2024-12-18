require("dotenv").config();
const express = require("express");
const connectMongoDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());
connectMongoDB();
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the asset finance specialist server!");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
