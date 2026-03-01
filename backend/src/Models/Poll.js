const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  options: [
    {
      text: String,
      votes: { type: Number, default: 0 }
    }
  ],
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  target_location: String,
  closes_at: Date,
  status: {
    type: String,
    enum: ["active", "closed"],
    default: "active"
  }
}, { timestamps: true });

module.exports = mongoose.model("Poll", pollSchema);