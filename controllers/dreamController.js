import Dream from "../models/Dream.js";


export const createDream = async (req, res) => {
  try {
    console.log("TOKEN USER:", req.user);
    const { title, description, emotions } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    // 🔥 AI dream analysis
    const analysis = analyzeDreamContent(description);

    const dream = await Dream.create({
      userId: req.user.id,
      title,
      description,
      emotions: emotions || [],

      // New fields using AI analysis
      category: analysis.category,
      tags: analysis.tags,
      sentiment: analysis.sentiment,
      suggestions: analysis.suggestions,
      aiNotes: analysis.aiNotes
    });

    return res.status(201).json({
      message: "Dream saved",
      dream
    });

  } catch (err) {
    console.error("CREATE DREAM ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getDreams = async (req, res) => {
  try {
    const dreams = await Dream
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    return res.json({ dreams });

  } catch (err) {
    console.error("GET DREAMS ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteDream = async (req, res) => {
  try {
    const { id } = req.params;

    await Dream.findOneAndDelete({
      _id: id,
      userId: req.user.id
    });

    return res.json({ message: "Dream deleted" });

  } catch (err) {
    console.error("DELETE DREAM ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
  


