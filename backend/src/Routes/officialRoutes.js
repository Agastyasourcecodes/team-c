
const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const { getPendingOfficials, approveOfficial, rejectOfficial } = require("../Controllers/officialController");

// Middleware to ensure the user making the request is an official
const isOfficial = (req, res, next) => {
  if (req.user && req.user.role === "official") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Officials only." });
  }
};

router.get("/pending", authMiddleware, isOfficial, getPendingOfficials);
router.put("/approve/:id", authMiddleware, isOfficial, approveOfficial);
router.delete("/reject/:id", authMiddleware, isOfficial, rejectOfficial);

module.exports = router;