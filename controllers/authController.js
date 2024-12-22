const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const winston = require("winston");

const userLogger = winston.loggers.get("UserLogger");

const signup = async (req, res) => {
  const { firstName, lastName, phone, address, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already in use",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      address,
      phone,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    userLogger.info("User signed up successfully", { email });
    res
      .status(201)
      .json({ message: "User created successfully!", success: true });
  } catch (err) {
    userLogger.error("User creation failed", {
      email: email,
      error: err.message,
      stack: err.stack,
    });
    res
      .status(400)
      .json({ message: "Error creating user", error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      userLogger.warn("User provided invalid credientials", { email });
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    userLogger.info("User logged in", { email });
    res.status(200).json({ message: "Login successful!", accessToken });
  } catch (err) {
    userLogger.error("User login failed", {
      email: email,
      error: err.message,
      stack: err.stack,
    });
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token found" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const userEmail = user.email;
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    userLogger.info("User refresh token successful", { userEmail });
    res.status(200).json({ accessToken });
  } catch (err) {
    userLogger.error("User refresh token failed", { userEmail });
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

module.exports = { signup, login, refreshToken };
