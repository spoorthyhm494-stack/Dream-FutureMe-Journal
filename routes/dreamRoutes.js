import express from "express";
import { createDream, getDreams, deleteDream } from "../controllers/dreamController.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createDream);
router.get("/all", authMiddleware, getDreams);
router.delete("/:id", authMiddleware, deleteDream);

export default router;