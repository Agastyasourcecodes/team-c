
const User = require("../Models/user");

// Get all unverified officials
exports.getPendingOfficials = async (req, res) => {
  try {
    const pendingOfficials = await User.find({ role: "official", isVerified: false });
    res.json(pendingOfficials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve an official
exports.approveOfficial = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { isVerified: true }, { new: true });
    
    if (!user) return res.status(404).json({ message: "Official not found" });
    res.json({ message: "Official approved successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reject (delete) an official
exports.rejectOfficial = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id); 
    res.json({ message: "Official rejected and removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};