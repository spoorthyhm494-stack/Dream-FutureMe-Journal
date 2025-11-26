import express from "express";
import { createDream, getDreams, updateDream, deleteDream } from "../controllers/dreamController.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createDream);
router.get("/all", authMiddleware, getDreams);
router.put("/:id", authMiddleware, updateDream);
router.delete("/:id", authMiddleware, deleteDream);

export default router;