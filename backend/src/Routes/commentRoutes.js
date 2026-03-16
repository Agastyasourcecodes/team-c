const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const {
  addComment,
  getCommentsByPetition,
  deleteComment,
} = require("../Controllers/commentController");

// Get comments for a petition (Public)
router.get("/petition/:petitionId", getCommentsByPetition);

// Add a comment (Requires Login)
router.post("/petition/:petitionId", auth, addComment);

// Delete a comment (Requires Login)
router.delete("/:id", auth, deleteComment);

module.exports = router;