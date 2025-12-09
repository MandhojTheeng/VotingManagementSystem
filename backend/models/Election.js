// backend/models/Election.js
const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["upcoming", "active", "completed"],
    default: "upcoming"
  },
  candidates: [
    {
      name: String,
      party: String,
      symbol: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Election", electionSchema);