const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");

const {
  createPetition,
  getPetitions,
  signPetition,
} = require("../Controllers/petitionController");

router.post("/", auth, createPetition);
router.get("/", getPetitions);  
router.post("/:id/sign", auth, signPetition);

module.exports = router;