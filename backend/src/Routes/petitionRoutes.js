const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");

const {
  createPetition,
  getPetitions,
  signPetition,
  deletePetition, 
  updatePetition,
  updatePetitionStatus // Add this new import
} = require("../Controllers/petitionController");

router.post("/", auth, createPetition);
router.get("/", getPetitions);  
router.post("/:id/sign", auth, signPetition);
router.delete("/:id", auth, deletePetition); 
router.put("/:id", auth, updatePetition); 

// New route for officials to change status
router.put("/:id/status", auth, updatePetitionStatus); 

module.exports = router;