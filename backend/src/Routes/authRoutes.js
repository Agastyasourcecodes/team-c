const express = require("express");
const router = express.Router();

const { register, login, forgotPassword, resetPassword } = require("../Controllers/authController");

router.post("/register", register);
router.post("/login", login);

// New routes for password reset
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;