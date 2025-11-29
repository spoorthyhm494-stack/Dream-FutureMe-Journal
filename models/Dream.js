import mongoose from "mongoose";

const dreamSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  emotions: {
    type: [String],
    default: [],
  },

  //  NEW FIELD → category (AI detected or user-selected)
  category: {
    type: String,
    default: "general",
  },

  // NEW FIELD → tags extracted from dream text
  tags: {
    type: [String],
    default: [],
  },

  // NEW FIELD → sentiment (positive / negative / neutral)
  sentiment: {
    type: String,
    default: "neutral",
  },

  // NEW FIELD → AI suggestions/tips for the user
  suggestions: {
    type: [String],
    default: [],
  },

  // NEW FIELD → optional notes for future analytics
  aiNotes: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Dream = mongoose.model("Dream", dreamSchema);
export default Dream;
