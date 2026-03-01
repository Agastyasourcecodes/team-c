const User = require("../Models/user"); // Ensure correct path mapping based on your system, can be "User" or "user"
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* REGISTER */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    let isVerified = true; // Citizens are verified by default

    if (role === "official") {
      // Check if this is the very first official
      const existingOfficial = await User.findOne({ role: "official" });
      if (existingOfficial) {
        // If an official already exists, this new one needs to be verified
        isVerified = false; 
      }
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      location,
      isVerified // Save the verification status
    });

    res.status(201).json({
      message: isVerified 
        ? "Registration successful! You can now sign in." 
        : "Registration successful! Your official account is pending verification by an administrator.",
      user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGIN */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    // PREVENT UNVERIFIED OFFICIALS FROM LOGGING IN
    if (!user.isVerified && user.role === "official") {
      return res.status(403).json({ 
        message: "Your official account is still pending verification by an existing official." 
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};