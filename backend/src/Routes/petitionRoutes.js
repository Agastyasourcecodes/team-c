// backend/src/Routes/petitionRoutes.js

const express = require("express");
const router = express.Router();

// ✅ correct import (match name + lowercase path)
const protect = require("../middleware/authMiddleware");

// ✅ import all controllers (including missing one)
const {
  createPetition,
  getPetitions,
  signPetition,
  deletePetition,
  updatePetition,
  updatePetitionStatus,
  respondToPetition
} = require("../Controllers/petitionController");

// ✅ routes
router.post("/", protect, createPetition);
router.get("/", getPetitions);

router.post("/:id/sign", protect, signPetition);
router.delete("/:id", protect, deletePetition);

router.put("/:id", protect, updatePetition);
router.put("/:id/status", protect, updatePetitionStatus);

// ✅ fixed error route
router.put("/:id/respond", protect, respondToPetition);

module.exports = router;