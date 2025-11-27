import FutureMessage from "../models/FutureMessage.js";

export const createFutureMessage = async (req, res) => {
  try {
    const { title, message, unlockDate, sendEmail } = req.body;
    
    if (!title || !message || !unlockDate) {
      return res.status(400).json({ message: "Title, message, and unlock date are required" });
    }

    const futureMessage = await FutureMessage.create({
      userId: req.user.id,
      title,
      message,
      unlockDate: new Date(unlockDate),
      sendEmail: sendEmail || false
    });

    return res.status(201).json({ message: "Future message created", futureMessage });
  } catch (err) {
    console.error("CREATE FUTURE MESSAGE ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getFutureMessages = async (req, res) => {
  try {
    const messages = await FutureMessage.find({ userId: req.user.id }).sort({ createdAt: -1 });
    
    // Update isUnlocked status in database for messages that should be unlocked
    const now = new Date();
    await FutureMessage.updateMany(
      { userId: req.user.id, unlockDate: { $lte: now }, isUnlocked: false },
      { $set: { isUnlocked: true } }
    );
    
    // Get updated messages
    const updatedMessages = await FutureMessage.find({ userId: req.user.id }).sort({ createdAt: -1 });
    
    const processedMessages = updatedMessages.map(msg => {
      if (msg.isUnlocked) {
        return msg;
      } else {
        return {
          _id: msg._id,
          title: msg.title,
          unlockDate: msg.unlockDate,
          createdAt: msg.createdAt,
          isUnlocked: false,
          message: "🔒 Message locked until " + new Date(msg.unlockDate).toLocaleDateString()
        };
      }
    });

    return res.json({ messages: processedMessages });
  } catch (err) {
    console.error("GET FUTURE MESSAGES ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
