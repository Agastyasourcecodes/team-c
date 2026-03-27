const User = require("../Models/user"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

/* REGISTER */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    let isVerified = true; 

    if (role === "official") {
      const existingOfficial = await User.findOne({ role: "official" });
      if (existingOfficial) {
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
      isVerified 
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

/* FORGOT PASSWORD */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist." });
    }

    // Generate a secure token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash the token and save it to the database with an expiration time (e.g., 1 hour)
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Configure Nodemailer 
    // Note: Add EMAIL_USERNAME and EMAIL_PASSWORD to your .env file
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Or your preferred email service
      auth: {
        user: process.env.EMAIL_USERNAME, 
        pass: process.env.EMAIL_PASSWORD, 
      },
    });

    // Create the reset URL (Assuming your frontend runs on localhost:3000 during dev)
    const resetURL = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

    const mailOptions = {
      from: '"Civix Support" <noreply@civix.com>',
      to: user.email,
      subject: "Password Reset Request",
      text: `You are receiving this email because you (or someone else) have requested the reset of a password. \n\n Please click on the following link, or paste this into your browser to complete the process:\n\n ${resetURL} \n\n If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset link sent to your email." });
  } catch (err) {
    res.status(500).json({ error: "There was an error sending the email. Try again later." });
  }
};

/* RESET PASSWORD */
exports.resetPassword = async (req, res) => {
  try {
    // Hash the token from the URL to compare with the one in the database
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    // Find the user with the valid token that hasn't expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Token is invalid or has expired." });
    }

    // Hash the new password
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the reset fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been successfully reset. You can now log in." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};