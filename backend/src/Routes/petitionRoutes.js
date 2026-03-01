const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");

const {
  createPetition,
  getPetitions,
  signPetition,
  deletePetition, // Imported the new controller
} = require("../Controllers/petitionController");

router.post("/", auth, createPetition);
router.get("/", getPetitions);  
router.post("/:id/sign", auth, signPetition);
router.delete("/:id", auth, deletePetition); // Added delete route

module.exports = router;