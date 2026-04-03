const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS FIX
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes
const petitionRoutes = require("./src/Routes/petitionRoutes");
const authRoutes = require("./src/Routes/authRoutes");
const pollRoutes = require("./src/Routes/pollRoutes");
const officialRoutes = require("./src/Routes/officialRoutes");
const commentRoutes = require("./src/Routes/commentRoutes");

app.use("/api/petitions", petitionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api/officials", officialRoutes);
app.use("/api/comments", commentRoutes);

// Test route
app.get("/", (req, res) => res.send("API running"));

// Error handling
app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);
  res.status(400).json({ error: err.message });
});

// Port
const PORT = process.env.PORT || 5000;

// DB + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log("MongoDB error:", err));