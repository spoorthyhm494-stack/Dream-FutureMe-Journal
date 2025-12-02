import express from "express";
import {
  createFutureMessage,
  getFutureMessages,
} from "../controllers/futureMessageController.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createFutureMessage);
router.get("/", authMiddleware, getFutureMessages);

export default router;

