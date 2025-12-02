import Progress from "../models/Progress.js";

export const updateProgress = async (req, res) => {
  try {
    const payload = { ...req.body, userId: req.user.userId };
    const p = await Progress.create(payload);
    return res.status(201).json({ message: "Progress added", progress: p });
  } catch (err) {
    console.error("PROGRESS ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getProgress = async (req, res) => {
  try {
    const list = await Progress.find({ userId: req.user.userId }).sort({ date: -1 });
    return res.json({ progress: list });
  } catch (err) {
    console.error("GET PROGRESS ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
