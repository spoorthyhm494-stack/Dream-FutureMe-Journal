import FutureMessage from "../models/FutureMessage.js";

export const createFutureMessage = async (req, res) => {
  try {
    const payload = { ...req.body, userId: req.user.userId };
    const fm = await FutureMessage.create(payload);
    return res.status(201).json({ message: "Future message saved", id: fm._id });
  } catch (err) {
    console.error("FUTURE MSG ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getFutureMessages = async (req, res) => {
  try {
    const list = await FutureMessage.find({ userId: req.user.userId }).sort({ unlockDate: 1 });
    return res.json({ messages: list });
  } catch (err) {
    console.error("GET FUTURE MSG ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

