require("dotenv").config();
const express = require("express");
const connectMongoDB = require("./config/db");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
connectMongoDB();

// Example route
app.get("/", (req, res) => {
  res.send("Hello, Express with MongoDB!");
});

// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
