// backend/src/models/Petition.js
const petitionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  signatures: { type: Number, default: 0 },
  goal: { type: Number, default: 500 },
  status: { 
    type: String, 
    enum: ["pending", "in-progress", "resolved", "rejected"],
    default: "pending"
  },
  officialResponse: { type: String, default: "" },
  respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  respondedAt: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });