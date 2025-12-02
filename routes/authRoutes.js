import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import authMiddleware from "../utils/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", authMiddleware, getProfile);
router.put("/update", authMiddleware, updateProfile);

export default router;



