const Petition = require("../Models/Petition");
const Signature = require("../Models/Signature");
exports.createPetition = async (req, res) => {
  try {
    const { title, description, category, location, signatureGoal } = req.body;

    
    if (
  !title ||
  !description ||
  !category ||
  !location ||
  signatureGoal === undefined
){
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
    const petitions = await Petition.find();
    res.json(petitions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};