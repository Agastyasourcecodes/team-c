const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  poll_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poll",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  selected_option: String,
}, { timestamps: true });

module.exports = mongoose.model("Vote", voteSchema);