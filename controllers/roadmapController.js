import Roadmap from "../models/Roadmap.js";

export const createRoadmap = async (req, res) => {
  try {
    const payload = { ...req.body, userId: req.user.id };
    const existing = await Roadmap.findOne({ userId: req.user.id });
    if (existing) {
      existing.goal = payload.goal || existing.goal;
      existing.steps = payload.steps || existing.steps;
      existing.progressPercent = payload.progressPercent ?? existing.progressPercent;
      await existing.save();
      return res.json({ message: "Roadmap updated", roadmap: existing });
    }
    const roadmap = await Roadmap.create(payload);
    return res.status(201).json({ message: "Roadmap created", roadmap });
  } catch (err) {
    console.error("ROADMAP ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ userId: req.user.id });
    return res.json({ roadmap });
  } catch (err) {
    console.error("GET ROADMAP ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

