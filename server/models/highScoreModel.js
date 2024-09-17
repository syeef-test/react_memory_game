import mongoose from "mongoose";

const highScoreSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    score: {
      type: Number,
      required: true,
    },
    moves: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const HighScore = mongoose.model("highscores", highScoreSchema);
