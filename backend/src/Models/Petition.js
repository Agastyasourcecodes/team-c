const mongoose = require("mongoose");

const petitionSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Environment",
        "Education",
        "Healthcare",
        "Infrastructure",
        "Women Safety",
        "Other",
      ],
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    signatureGoal: {
      type: Number,
      required: true,
      min: 1,
    },

    signatureCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "under_review", "in_progress", "resolved", "dismissed", "closed"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Petition", petitionSchema);