import express from "express";
import {
  createRoadmap,
  getRoadmap,
  debugRoadmaps,
} from "../controllers/roadmapController.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createRoadmap);
router.get("/", authMiddleware, getRoadmap);
router.get("/debug", debugRoadmaps); // No auth needed for debugging

export default router;