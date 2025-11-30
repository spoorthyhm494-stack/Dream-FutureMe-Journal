import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connection.js";
import authRoutes from "./routes/authRoutes.js";
import dreamRoutes from "./routes/dreamRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
connectDB();
app.use(cors());
app.use(express.json());



app.use("/api/auth", authRoutes);
app.use("/api/dreams", dreamRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));