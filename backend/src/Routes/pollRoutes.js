const express = require("express");
const router = express.Router();
const {
  createPoll,
  getPolls,
  votePoll,
  getResults,
  updatePoll,
  deletePoll
} = require("../Controllers/pollController");

const authMiddleware = require("../Middleware/authMiddleware");

router.post("/", authMiddleware, createPoll);
router.get("/", getPolls);
router.post("/:pollId/vote", authMiddleware, votePoll);
router.get("/:pollId/results", getResults);
router.put("/:pollId", authMiddleware, updatePoll);
router.delete("/:pollId", authMiddleware, deletePoll);

module.exports = router;