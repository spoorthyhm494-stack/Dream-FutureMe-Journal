import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./db/connection.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import dreamRoutes from "./routes/dreamRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import decoderRoutes from "./routes/decoderRoutes.js";

// Auth middleware (named export)
import { protect } from "./utils/authMiddleware.js";

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Public routes
app.use("/api/auth", authRoutes);
app.use("/api/dreams", dreamRoutes);
app.use("/api/ai", aiRoutes);

// Protected routes
app.use("/api/decoder", protect, decoderRoutes);
app.use("/api/roadmap", protect, roadmapRoutes);
app.use("/api/progress", protect, progressRoutes);

// Root
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
