const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  income: { type: String, required: true },
  expenses: { type: String, required: true },
  assets: { type: String, required: true },
  liabilities: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Application", applicationSchema);
