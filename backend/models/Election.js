// models/Election.js
const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["upcoming", "active", "completed"],
    default: "upcoming"
  },
  candidates: [
    {
      name: {
        type: String,
        required: true,
        trim: true
      },
      party: {
        type: String,
        default: "Independent",
        trim: true
      },
      symbol: {
        type: String,
        default: ""
      },
      voteCount: {
        type: Number,
        default: 0,
        min: 0
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual to auto-calculate status (optional, cleaner than manual update)
electionSchema.virtual("currentStatus").get(function () {
  const now = new Date();
  if (now < this.startDate) return "upcoming";
  if (now <= this.endDate) return "active";
  return "completed";
});

module.exports = mongoose.model("Election", electionSchema);