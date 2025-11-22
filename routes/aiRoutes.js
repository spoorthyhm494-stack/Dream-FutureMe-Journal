import express from "express";
import { generateRoadmap, analyzeDream } from "../controllers/aiController.js";

const router = express.Router();

router.post("/roadmap", generateRoadmap);
router.post("/dream", analyzeDream);

export default router;
