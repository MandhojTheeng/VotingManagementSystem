const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  electionId: { type: mongoose.Schema.Types.ObjectId, ref: "Election" },
  candidateId: { type: mongoose.Schema.Types.ObjectId },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  votedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Vote", voteSchema);