const Comment = require("../Models/Comment");
const Petition = require("../Models/Petition");

// Add a new comment
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const petitionId = req.params.petitionId;

    // Check if petition exists
    const petition = await Petition.findById(petitionId);
    if (!petition) {
      return res.status(404).json({ message: "Petition not found" });
    }

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const comment = await Comment.create({
      petition: petitionId,
      user: req.user.id,
      text,
    });

    // Populate user info (name) before sending back
    const populatedComment = await comment.populate("user", "name");

    res.status(201).json({
      message: "Comment added successfully",
      comment: populatedComment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all comments for a specific petition
exports.getCommentsByPetition = async (req, res) => {
  try {
    const comments = await Comment.find({ petition: req.params.petitionId })
      .populate("user", "name")
      .sort({ createdAt: -1 }); // Newest first

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a comment (Only by the owner)
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "User not authorized" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};