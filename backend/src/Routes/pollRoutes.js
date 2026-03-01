const express = require("express");
const router = express.Router();
const {
  createPoll,
  getPolls,
  votePoll,
  getResults
} = require("../Controllers/pollController");

const authMiddleware = require("../Middleware/authMiddleware");

router.post("/", authMiddleware, createPoll);
router.get("/", getPolls);
router.post("/:pollId/vote", authMiddleware, votePoll);
router.get("/:pollId/results", getResults);

module.exports = router;