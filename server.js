import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
connectDB();

import express from "express";

import authRoutes from "./routes/authRoutes.js";
import dreamRoutes from "./routes/dreamRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import futureMessageRoutes from "./routes/futureMessageRoutes.js";


const app = express();

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  next();
});

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running vikki don't worry!");
});

// Echo test route
app.post("/echo", (req, res) => {
  res.json({ youSent: req.body });
});

// ⭐ ADD YOUR API ROUTES HERE
app.use("/api/auth", authRoutes);
app.use("/api/dream", dreamRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/future", futureMessageRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
