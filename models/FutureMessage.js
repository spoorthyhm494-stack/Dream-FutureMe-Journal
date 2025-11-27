import mongoose from "mongoose";

const futureMessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  unlockDate: {
    type: Date,
    required: true,
  },

  isUnlocked: {
    type: Boolean,
    default: false,
  },

  sendEmail: {
    type: Boolean,
    default: false,
  },

  delivered: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FutureMessage = mongoose.model("FutureMessage", futureMessageSchema);
export default FutureMessage;
