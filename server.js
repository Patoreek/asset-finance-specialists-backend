require("dotenv").config();
const express = require("express");
const connectMongoDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
connectMongoDB();

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Express with MongoDB!");
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
