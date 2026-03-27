const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["citizen", "official"],
    default: "citizen",
  },
  location: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  // New fields for forgot password functionality
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);