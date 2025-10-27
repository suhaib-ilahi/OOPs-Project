// /models/Quiz.js
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    creator: { type: String, required: true, trim: true },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  {
    timestamps: true,
  }
);

quizSchema.methods.calculateScore = async function (answers) {
  // ensure questions are populated
  if (!this.populated("questions")) {
    await this.populate("questions");
  }

  const total = this.questions.length;
  let score = 0;
  const details = this.questions.map((question, index) => {
    const given = typeof answers[index] !== "undefined" ? answers[index] : null;
    const correct = question.correctOption;
    const isCorrect = given !== null && given === correct;
    if (isCorrect) score++;
    return {
      questionId: question._id,
      given,
      correct,
      isCorrect,
    };
  });

  return { score, total, details };
};

export const Quiz = mongoose.model("Quiz", quizSchema);
