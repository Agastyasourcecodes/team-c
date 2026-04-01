const Petition = require("../Models/Petition");
const Signature = require("../Models/Signature");

exports.createPetition = async (req, res) => {
  try {
    const { title, description, category, location, signatureGoal } = req.body;

    if (
      !title ||
      
      !category ||
      !location ||
      signatureGoal === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const petition = await Petition.create({
      creator: req.user.id,
      title,
      description,
      category,
      location,
      signatureGoal,
    });

    res.status(201).json({
      message: "Petition created successfully",
      petition,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.signPetition = async (req, res) => {
  try {
    const petition = await Petition.findById(req.params.id);

    if (!petition)
      return res.status(404).json({ message: "Petition not found" });

    if (petition.status === "closed")
      return res.status(400).json({ message: "Petition closed" });

    const signature = await Signature.create({
      petition: req.params.id,
      user: req.user.id,
    });

    petition.signatureCount += 1;

    if (petition.signatureCount >= petition.signatureGoal) {
      petition.status = "active";
    }

    await petition.save();

    res.json({
      message: "Petition signed successfully",
      signature,
      currentSignatures: petition.signatureCount,
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already signed" });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.getPetitions = async (req, res) => {
  try {
    const { location, category, status } = req.query;

    let filter = {};
    
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    if (status) {
      filter.status = status;
    }

    const petitions = await Petition.find(filter)
      .sort({ createdAt: -1 });

    res.json(petitions);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePetition = async (req, res) => {
  try {
    const petition = await Petition.findById(req.params.id);

    if (!petition) {
      return res.status(404).json({ message: "Petition not found" });
    }

    if (petition.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: "User not authorized to delete this petition" });
    }

    await petition.deleteOne();

    await Signature.deleteMany({ petition: req.params.id });

    res.json({ message: "Petition removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// NEW: Edit/Update Petition logic
exports.updatePetition = async (req, res) => {
  try {
    const petition = await Petition.findById(req.params.id);

    if (!petition) {
      return res.status(404).json({ message: "Petition not found" });
    }

    // Ensure the user editing the petition is the one who created it
    if (petition.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: "User not authorized to edit this petition" });
    }

    const { title, description, category, location, signatureGoal } = req.body;
    
    // Update fields if provided
    if (title) petition.title = title;
    if (description) petition.description = description;
    if (category) petition.category = category;
    if (location) petition.location = location;
    if (signatureGoal) petition.signatureGoal = signatureGoal;

    await petition.save();

    res.json({ message: "Petition updated successfully", petition });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// backend/src/Controllers/petitionController.js (Add this at the bottom)

exports.updatePetitionStatus = async (req, res) => {
  try {
    // Security Check: Ensure the user is an official
    if (req.user.role !== "official") {
      return res.status(403).json({ message: "Access denied. Only officials can update petition statuses." });
    }

    const { status } = req.body;
    const validStatuses = ["active", "under_review", "in_progress", "resolved", "dismissed", "closed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value provided." });
    }

    const petition = await Petition.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!petition) {
      return res.status(404).json({ message: "Petition not found" });
    }

    res.json({ message: "Petition status updated successfully", petition });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.respondToPetition = async (req, res) => {
  try {
    const { id } = req.params;
    const { officialResponse, status } = req.body;
    
    const petition = await Petition.findById(id);
    
    if (!petition) {
      return res.status(404).json({ message: "Petition not found" });
    }
    
    petition.officialResponse = officialResponse;
    petition.status = status || "in-progress";
    petition.respondedAt = new Date();
    petition.respondedBy = req.user.id;
    
    await petition.save();
    
    res.json({ message: "Response submitted successfully", petition });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};