// /services/QuizService.js
import mongoose from "mongoose";
import {Quiz} from "../models/Quiz.js";
import {Question} from "../models/Question.js";

class QuizService {
  async createQuiz(title, creator) {
    if (!title || typeof title !== "string") throw new Error("Invalid title");
    if (!creator || typeof creator !== "string") throw new Error("Invalid creator");

    // const existing = await Quiz.findOne({ title }).lean();
    // if (existing) throw new Error("Quiz title already exists");

    const quiz = await Quiz.create({ title, creator, questions: [] });
    return quiz;
  }
  async addQuestion(quizTitle, text, options, correctOption) {
  const quiz = await Quiz.findOne({ title: quizTitle });
  if (!quiz) throw new Error("Quiz not found");

  const question = await Question.create({ text, options, correctOption });
  quiz.questions.push(question._id);
  await quiz.save();

  return await Quiz.findById(quiz._id).populate("questions");
}


  async getAllQuizzes() {
    return await Quiz.find().populate("questions").lean();
  }

  async getQuizByTitle(title) {
    if (!title || typeof title !== "string") throw new Error("Invalid title");
    const quiz = await Quiz.findOne({ title }).populate("questions");
    if (!quiz) throw new Error("Quiz not found");
    return quiz;
  }

  async calculateQuizScore(quizTitle, answers) {
    if (!quizTitle || typeof quizTitle !== "string") throw new Error("Invalid quizTitle");
    if (!Array.isArray(answers)) throw new Error("answers must be an array");

    const quiz = await Quiz.findOne({ title: quizTitle }).populate("questions");
    if (!quiz) throw new Error("Quiz not found");

    const total = quiz.questions.length;
    let score = 0;
    const details = quiz.questions.map((q, idx) => {
      const given = typeof answers[idx] !== "undefined" ? answers[idx] : null;
      const correct = q.correctOption;
      const isCorrect = given !== null && given === correct;
      if (isCorrect) score++;
      return { questionId: q._id, given, correct, isCorrect };
    });

    return { score, total, details };
  }

  async deleteQuizByTitle(title) {
    if (!title || typeof title !== "string") throw new Error("Invalid title");

    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        const quiz = await Quiz.findOne({ title }).session(session);
        if (!quiz) throw new Error("Quiz not found");

        await Question.deleteMany({ _id: { $in: quiz.questions } }).session(session);
        await Quiz.deleteOne({ _id: quiz._id }).session(session);
      });
    } finally {
      session.endSession();
    }
  }

  
}

export default new QuizService();
