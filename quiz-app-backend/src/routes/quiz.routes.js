// /routes/quizRoutes.js
import express from "express";
import quizController from "../controllers/QuizController.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

// create quiz:tested
router.post("/create-quiz", asyncHandler(quizController.createQuiz.bind(quizController)));

// add question to quiz (use :title route param):tested
router.post(
  "/:title/add-questions",
  asyncHandler(quizController.addQuestion.bind(quizController))
);

// get all quizzes:Tested
router.get("/", asyncHandler(quizController.getAllQuizzes.bind(quizController)));

// get single quiz by title (req.params.title):tested
router.get("/:title", asyncHandler(quizController.getQuizByTitle.bind(quizController)));

// calculate score for a quiz" :tested
router.post(
  "/:title/score",
  asyncHandler(quizController.calculateScore.bind(quizController))
);

// delete quiz by title:tested
router.delete(
  "/:title",
  asyncHandler(quizController.deleteQuizByTitle.bind(quizController))
);

export default router;
