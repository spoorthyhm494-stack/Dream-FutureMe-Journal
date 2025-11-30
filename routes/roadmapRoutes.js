import express from "express";
import {
  generateRoadmap,
  getRoadmap,
  updateRoadmapStep,
  debugRoadmaps,
} from "../controllers/roadmapController.js";

import { protect } from "../utils/authMiddleware.js";

const router = express.Router();

router.post("/generate", protect, generateRoadmap);
router.get("/", protect, getRoadmap);
router.get("/debug", debugRoadmaps);
router.patch("/update-step", protect, updateRoadmapStep);

export default router;
