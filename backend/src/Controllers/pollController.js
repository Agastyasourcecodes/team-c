const Poll = require("../models/Poll");
const Vote = require("../models/Vote");

/* CREATE POLL */
exports.createPoll = async (req, res) => {
  try {
    const { title, description, options, target_location, closes_at } = req.body;

    const formattedOptions = options.map(opt => ({
      text: opt,
      votes: 0
    }));

    const poll = await Poll.create({
      title,
      description,
      options: formattedOptions,
      created_by: req.user.id,
      target_location,
      closes_at
    });

    res.status(201).json(poll);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* GET ALL POLLS */
exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find().populate("created_by", "name role");
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* VOTE */
exports.votePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { selected_option } = req.body;

    const poll = await Poll.findById(pollId);
    if (!poll)
      return res.status(404).json({ message: "Poll not found" });

    // 🔥 AUTO CLOSE CHECK
    if (poll.closes_at && new Date() > poll.closes_at) {
      poll.status = "closed";
      await poll.save();
      return res.status(400).json({ message: "Poll is closed" });
    }

    if (poll.status === "closed")
      return res.status(400).json({ message: "Poll is closed" });

    // Check if already voted
    const existingVote = await Vote.findOne({
      poll_id: pollId,
      user_id: req.user.id
    });

    if (existingVote)
      return res.status(400).json({ message: "Already voted" });

    const option = poll.options.find(
      opt => opt.text === selected_option
    );

    if (!option)
      return res.status(400).json({ message: "Invalid option" });

    option.votes += 1;
    await poll.save();

    await Vote.create({
      poll_id: pollId,
      user_id: req.user.id,
      selected_option
    });

    res.json({ message: "Vote submitted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Update poll (only by creator and Official)
exports.updatePoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { title, description, options, target_location, closes_at } = req.body;

    const poll = await Poll.findById(pollId);
    if (!poll)
      return res.status(404).json({ message: "Poll not found" });

    // ✅ Creator OR Official can update
    if (
      poll.created_by.toString() !== req.user.id &&
      req.user.role !== "official"
    ) {
      return res.status(403).json({ message: "Not authorized to update poll" });
    }

    if (title) poll.title = title;
    if (description) poll.description = description;
    if (target_location) poll.target_location = target_location;
    if (closes_at) poll.closes_at = closes_at;

    if (options) {
      poll.options = options.map(opt => ({
        text: opt,
        votes: 0
      }));
    }

    await poll.save();

    res.json({
      message: "Poll updated successfully",
      poll
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET RESULTS */
exports.getResults = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId);
    if (!poll)
      return res.status(404).json({ message: "Poll not found" });

    // Calculate total votes
    const totalVotes = poll.options.reduce(
      (sum, option) => sum + option.votes,
      0
    );

    // Add percentage to each option
    const results = poll.options.map(option => {
      const percentage =
        totalVotes === 0
          ? 0
          : ((option.votes / totalVotes) * 100).toFixed(2);

      return {
        text: option.text,
        votes: option.votes,
        percentage: `${percentage}%`
      };
    });

    res.json({
      title: poll.title,
      status: poll.status,
      closes_at: poll.closes_at,
      totalVotes,
      results
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Delete poll (only by creator and Official)
exports.deletePoll = async (req, res) => {
  try {
    const { pollId } = req.params;

    const poll = await Poll.findById(pollId);
    if (!poll)
      return res.status(404).json({ message: "Poll not found" });

    // ✅ Creator OR Official can delete
    if (
      poll.created_by.toString() !== req.user.id &&
      req.user.role !== "official"
    ) {
      return res.status(403).json({ message: "Not authorized to delete poll" });
    }

    await Poll.findByIdAndDelete(pollId);

    res.json({
      message: "Poll deleted successfully"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};