import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuiz } from "../contexts/QuizContext.jsx";
import { useUser } from "../contexts/UserContext.jsx";

const TakeQuiz = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const { fetchQuizByTitle, currentQuiz, loading, error } = useQuiz();
  const { currentUser, attemptQuiz } = useUser();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (title) {
      fetchQuizByTitle(decodeURIComponent(title));
    }
  }, [title, fetchQuizByTitle]);

  const handleAnswerSelect = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSubmitQuiz = async () => {
    if (!currentUser) {
      alert("Please login to submit your quiz");
      navigate("/login");
      return;
    }

    try {
      const answersArray = currentQuiz.questions.map((_, idx) => answers[idx] ?? -1);
      const result = await attemptQuiz({
        email: currentUser.email,
        quizTitle: currentQuiz.title,
        answers: answersArray,
      });

      setScore(result.score);
      setQuizCompleted(true);
    } catch (err) {
      console.error("Error submitting quiz:", err);
      alert("Error submitting quiz. Try again.");
    }
  };

  if (loading || !currentQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Quiz Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={() => navigate("/")} className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
            <p className="text-gray-600">Great job! Here's your result:</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 mb-6 shadow-inner">
            <div className="text-4xl font-bold text-indigo-600 mb-2">{score}/{currentQuiz.questions.length}</div>
            <div className="text-gray-700">{Math.round((score / currentQuiz.questions.length) * 100)}% Correct</div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate("/")} className="btn-primary w-full">
              Back to Home
            </button>
            <button
              onClick={() => {
                setQuizCompleted(false);
                setCurrentQuestionIndex(0);
                setAnswers({});
                setScore(null);
              }}
              className="btn-secondary w-full"
            >
              Retake Quiz
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white pb-8">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10 border-b">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-indigo-700">{currentQuiz.title}</h1>
            <p className="text-gray-500">Created by: {currentQuiz.creator}</p>
          </div>
          <button onClick={() => navigate("/")} className="btn-secondary">
            Exit Quiz
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <main className="max-w-4xl mx-auto px-6 mt-8">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 space-y-6"
        >
          <h2 className="text-xl font-semibold text-gray-900">{currentQuestion.text}</h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <label
                key={idx}
                className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors duration-200 ${
                  answers[currentQuestionIndex] === idx
                    ? "bg-indigo-100 border-indigo-400"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  checked={answers[currentQuestionIndex] === idx}
                  onChange={() => handleAnswerSelect(currentQuestionIndex, idx)}
                  className="h-4 w-4 text-indigo-600 border-gray-300"
                />
                <span className="ml-3 text-gray-900">{option}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button onClick={handleNextQuestion} className="btn-primary">
              {currentQuestionIndex === currentQuiz.questions.length - 1
                ? "Submit Quiz"
                : "Next Question"}
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default TakeQuiz;
