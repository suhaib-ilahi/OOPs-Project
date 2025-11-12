import React from "react";
import { Link } from "react-router-dom";
import { useQuiz } from "../contexts/useQuiz.js";
import { useUser } from "../contexts/useUser.js";
import QuizCard from "../components/QuizCard.jsx";
import {motion} from "framer-motion"

const Home = () => {
  const { quizzes, loading, error } = useQuiz();
  const { currentUser } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 to-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/60 border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
              Quiz App
            </h1>
            <p className="text-gray-500 text-sm">
              Test your knowledge with interactive quizzes
            </p>
          </div>

          <div className="flex space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {currentUser.name}!</span>
                <Link
                  to="/create-quiz"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                >
                  Create Quiz
                </Link>
              </div>
            ) : (
              <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">Hello, User!</div>
              // <Link
              //   to="/login"
              //   className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
              // >
              //   Login / Register
              // </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center mt-12 px-6">
        <h2 className="text-4xl font-bold text-indigo-700 mb-4">
          Ready to Test Your Knowledge?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Explore quizzes or create your own interactive challenges
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/create-quiz"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white text-lg font-medium shadow-lg hover:bg-indigo-700 transition"
          >
            Create Quiz
          </Link>
          <Link
            to="/quizzes"
            className="px-6 py-3 rounded-lg bg-white border border-gray-200 text-indigo-700 text-lg font-medium shadow hover:shadow-md transition"
          >
            Browse Quizzes
          </Link>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="max-w-4xl mx-auto mt-8 bg-red-50 border border-red-200 rounded-xl p-4 shadow-md">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* Quizzes Grid */}
      <main className="max-w-6xl mx-auto mt-12 px-6 pb-20">
        <h3 id="quizzes" className="text-2xl font-bold text-gray-900 mb-6">
          Available Quizzes
        </h3>

        {quizzes.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No quizzes available
            </h3>
            <p className="text-gray-500">Be the first to create a quiz!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <motion.div
                key={quiz.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <QuizCard quiz={quiz} />
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
