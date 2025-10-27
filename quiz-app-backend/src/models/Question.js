// /models/Question.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length >= 2,
        message: "Options must be an array with at least two items",
      },
    },
    correctOption: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

questionSchema.methods.checkAnswer = function (givenAnswer) {
  return givenAnswer !== undefined && givenAnswer === this.correctOption;
};

export const Question = mongoose.model("Question", questionSchema);
