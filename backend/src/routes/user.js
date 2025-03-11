import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../middleware/auth.js"; // Middleware to protect routes

const router = express.Router();

// ✅ GET USER DATA (Protected Route)
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
});

export default router;
