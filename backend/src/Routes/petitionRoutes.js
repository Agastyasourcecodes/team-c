const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");

const {
  createPetition,
  getPetitions,
  signPetition,
  deletePetition, 
  updatePetition, // Imported the update controller
} = require("../Controllers/petitionController");

router.post("/", auth, createPetition);
router.get("/", getPetitions);  
router.post("/:id/sign", auth, signPetition);
router.delete("/:id", auth, deletePetition); 
router.put("/:id", auth, updatePetition); // Added update route

module.exports = router;