import express from "express";
import {
  createRoadmap,
  getRoadmap,
} from "../controllers/roadmapController.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createRoadmap);
router.get("/", authMiddleware, getRoadmap);

export default router;