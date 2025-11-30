import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  goal: {
    type: String,
    required: true,
  },

  steps: [
    {
      title: String,
      completed: { type: Boolean, default: false },
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Roadmap = mongoose.model("Roadmap", roadmapSchema);
export default Roadmap;