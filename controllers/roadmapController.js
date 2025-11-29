import axios from "axios";
import Roadmap from "../models/Roadmap.js";

// -------------------------
// GENERATE ROADMAP (AI)
// -------------------------
export const generateRoadmap = async (req, res) => {
  try {
    const { goal } = req.body;
    const userId = req.user.id;

    if (!goal) {
      return res.status(400).json({ message: "Goal is required" });
    }

    // -------------------------
    // 1️⃣ Ask Gemini 2.0 Flash (Free)
    // -------------------------
    const prompt = `
Generate a detailed roadmap for the goal: "${goal}".
Return ONLY clean JSON in this exact structure:

{
  "steps": [
    {
      "stepNumber": 1,
      "title": "Step title",
      "description": "Short explanation",
      "duration": "2 weeks",
      "tasks": {
        "daily": ["Task 1", "Task 2"],
        "weekly": ["Task 1", "Task 2"]
      },
      "tools": ["Tool 1", "Tool 2"],
      "resources": {
        "youtube": ["Link 1", "Link 2"],
        "courses": ["Link 1", "Link 2"]
      },
      "completed": false
    }
  ],
  "finalChecklist": ["Checklist item 1", "Checklist item 2"]
}
ONLY RETURN JSON. No extra text.
`;

    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.0-flash-exp:free",
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const rawOutput = aiResponse.data.choices[0].message.content;

    let roadmapJSON;
    try {
      roadmapJSON = JSON.parse(rawOutput);
    } catch (err) {
      console.error("AI JSON ERROR:", rawOutput);
      return res.status(500).json({ message: "AI returned invalid JSON" });
    }

    // -------------------------
    // 2️⃣ Save into database
    // -------------------------
    const newRoadmap = await Roadmap.create({
      userId,
      goal,
      steps: roadmapJSON.steps || [],
      finalChecklist: roadmapJSON.finalChecklist || [],
      createdAt: new Date()
    });

    return res.status(201).json({
      message: "Roadmap created successfully",
      roadmap: newRoadmap
    });

  } catch (err) {
    console.error("ROADMAP ERROR:", err.response?.data || err);
    return res.status(500).json({ message: "Server error" });
  }
};

// -------------------------
// GET USER ROADMAP
// -------------------------
export const getRoadmap = async (req, res) => {
  try {
    const userId = req.user.id;
    const roadmap = await Roadmap.find({ userId }).sort({ createdAt: -1 });
    return res.json({ roadmap });
  } catch (err) {
    console.error("GET ROADMAP ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// -------------------------
// UPDATE ROADMAP STEP
// -------------------------
export const updateRoadmapStep = async (req, res) => {
  try {
    const { roadmapId, stepIndex } = req.body;

    const roadmap = await Roadmap.findById(roadmapId);
    if (!roadmap) return res.status(404).json({ message: "Roadmap not found" });

    roadmap.steps[stepIndex].completed =
      !roadmap.steps[stepIndex].completed;

    await roadmap.save();

    const completed = roadmap.steps.filter(s => s.completed).length;
    const total = roadmap.steps.length;
    const percent = Math.round((completed / total) * 100);

    return res.json({
      message: "Step updated",
      roadmap,
      progress: percent + "%"
    });
  } catch (err) {
    console.error("UPDATE STEP ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
