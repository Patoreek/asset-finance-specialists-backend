const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    const clientOptions = {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    };
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
