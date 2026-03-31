// backend/src/controllers/petitionController.js
export const respondToPetition = async (req, res) => {
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