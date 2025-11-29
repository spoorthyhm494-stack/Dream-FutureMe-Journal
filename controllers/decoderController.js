// ../controllers/decoderController.js

import { runAI } from "../utils/aiUtils.js";

// Create decoder (placeholder)
export const createDecoder = (req, res) => {
  res.send("Decoder created");
};

// Get all decoders (placeholder)
export const getDecoders = (req, res) => {
  res.send("List of decoders");
};

// Decode a dream using OpenRouter
export const decodeDream = async (req, res) => {
  try {
    const { dream } = req.body;

    if (!dream) {
      return res.status(400).json({ message: "Dream text is required" });
    }

    const prompt = `Analyze and decode this dream psychologically and symbolically:\n${dream}`;

    // Call OpenRouter
    const output = await runAI(prompt);

    res.json({ decoded: output });
  } catch (error) {
    console.error("Decoder Error:", error);
    res.status(500).json({ message: "Failed to decode dream" });
  }
};

