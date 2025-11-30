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

    const prompt = `
Generate a detailed roadmap for the goal: "${goal}". Return ONLY JSON:
{
  "steps": [
    {
      "stepNumber": 1,
      "title": "Step title",
      "description": "Short explanation",
      "duration": "2 weeks",
      "tasks": {
        "daily": ["Task 1","Task 2"],
        "weekly": ["Task 1","Task 2"]
      },
      "tools": ["Tool 1"],
      "resources": {
        "youtube": [],
        "courses": []
      },
      "completed": false
    }
  ],
  "finalChecklist": ["Checklist item 1"]
}
`;

    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.0-flash-exp:free",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );

    let roadmapJSON;
    try {
      roadmapJSON = JSON.parse(aiResponse.data.choices[0].message.content);
    } catch (err) {
      return res.status(500).json({
        message: "AI returned invalid JSON",
        raw: aiResponse.data.choices[0].message.content,
      });
    }

    const newRoadmap = await Roadmap.create({
      userId,
      goal,
      steps: roadmapJSON.steps,
      finalChecklist: roadmapJSON.finalChecklist,
    });

    return res.status(201).json({ roadmap: newRoadmap });
  } catch (err) {
    console.error("ROADMAP ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// -------------------------
// GET USER ROADMAP
// -------------------------
export const getRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    return res.json({ roadmap });
  } catch (err) {
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

    const completed = roadmap.steps.filter((s) => s.completed).length;
    const percent = Math.round((completed / roadmap.steps.length) * 100);

    return res.json({ roadmap, progress: percent });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// DEBUG ROUTE
export const debugRoadmaps = async (req, res) => {
  const all = await Roadmap.find();
  res.json(all);
};
