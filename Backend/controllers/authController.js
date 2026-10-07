import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* =========================================================
   CREATE JWT TOKEN
========================================================= */

const generateToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

/* =========================================================
   REGISTER
========================================================= */

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    /* -----------------------------------------------------
       VALIDATION
    ----------------------------------------------------- */

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    /* -----------------------------------------------------
       CHECK EXISTING USER
    ----------------------------------------------------- */

    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    /* -----------------------------------------------------
       HASH PASSWORD
    ----------------------------------------------------- */

    const hashedPassword = await bcrypt.hash(password, 10);

    /* -----------------------------------------------------
       CREATE USER
    ----------------------------------------------------- */

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "customer",
    });

    /* -----------------------------------------------------
       CREATE TOKEN
    ----------------------------------------------------- */

    const token = generateToken(user._id);

    /* -----------------------------------------------------
       RESPONSE
    ----------------------------------------------------- */

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create account",
      error: error.message,
    });
  }
};

/* =========================================================
   LOGIN
========================================================= */

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    /* -----------------------------------------------------
       VALIDATION
    ----------------------------------------------------- */

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    /* -----------------------------------------------------
       FIND USER
    ----------------------------------------------------- */

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    /* -----------------------------------------------------
       CHECK PASSWORD
    ----------------------------------------------------- */

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    /* -----------------------------------------------------
       CREATE TOKEN
    ----------------------------------------------------- */

    const token = generateToken(user._id);

    /* -----------------------------------------------------
       RESPONSE
    ----------------------------------------------------- */

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
};

/* =========================================================
   GET CURRENT USER
========================================================= */

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GET CURRENT USER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get current user",
      error: error.message,
    });
  }
};
