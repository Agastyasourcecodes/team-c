const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
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

app.get("/", (req, res) => res.send("API running"));

// Error handling
app.use((err, req, res, next) => {
  console.error("JSON ERROR:", err.message);
  res.status(400).json({ error: "Invalid JSON format" });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.log("MongoDB error:", err));