import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../contexts/useQuiz.js";
import { useUser } from "../contexts/useUser.js";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { createQuiz, addQuestion, loading, clearError } = useQuiz();
  const { currentUser } = useUser();

  const [quizData, setQuizData] = useState({
    title: "",
    creator: currentUser?.name || "",
  });

  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correctOption: 0 },
  ]);

  const [currentStep, setCurrentStep] = useState(1);

  const handleQuizDataChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (i, field, value) => {
    const updated = [...questions];
    if (field === "options") updated[i].options = value;
    else updated[i][field] = value;
    setQuestions(updated);
  };

  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", options: ["", "", "", ""], correctOption: 0 },
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1)
      setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    clearError();
    // if (!currentUser) {
    //   alert("Please login to create a quiz");
    //   navigate("/login");
    //   return;
    // }
    console.log('====================================');
    console.log(questions);
    console.log('====================================');
    try {
      await createQuiz(quizData);
      for (const q in questions) {
        console.log('====================================');
        console.log(q);
        console.log('====================================');
        await addQuestion({
          quizTitle: quizData.title,
          text: q.text,
          options: q.options,
          correctOption: q.correctOption,
        });
      }
      alert("🎉 Quiz created successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 to-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/60 border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
              Create a Quiz
            </h1>
            <p className="text-gray-500 text-sm">Build your interactive challenge 🧠</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition"
          >
            ⬅ Back
          </button>
        </div>
      </header>

      {/* Steps */}
      <div className="max-w-3xl mx-auto px-6 mt-10">
        <div className="flex items-center justify-between mb-8 relative">
          <div
            className={`flex items-center space-x-3 ${currentStep >= 1 ? "text-indigo-600" : "text-gray-400"
              }`}
          >
            <div
              className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold text-white ${currentStep >= 1 ? "bg-indigo-600" : "bg-gray-300"
                }`}
            >
              1
            </div>
            <span className="font-medium">Quiz Details</span>
          </div>

          <div className="absolute left-1/2 top-1/2 w-1/2 h-0.5 bg-gray-200 -translate-y-1/2" />

          <div
            className={`flex items-center space-x-3 ${currentStep >= 2 ? "text-indigo-600" : "text-gray-400"
              }`}
          >
            <div
              className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold text-white ${currentStep >= 2 ? "bg-indigo-600" : "bg-gray-300"
                }`}
            >
              2
            </div>
            <span className="font-medium">Questions</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <main className="max-w-3xl mx-auto px-6 pb-20">
        {currentStep === 1 && (
          <div className="backdrop-blur-md bg-white/70 p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Quiz Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quiz Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={quizData.title}
                  onChange={handleQuizDataChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="Enter an engaging title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Creator Name
                </label>
                <input
                  type="text"
                  name="creator"
                  value={quizData.creator}
                  onChange={handleQuizDataChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="Your name or username"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!quizData.title.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition"
                >
                  Next ➡
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="backdrop-blur-md bg-white/70 p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Quiz Questions
              </h2>
              <button
                onClick={addNewQuestion}
                type="button"
                className="text-sm px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition"
              >
                ➕ Add Question
              </button>
            </div>

            {questions.map((q, i) => (
              <div
                key={i}
                className="bg-white/60 border border-gray-100 rounded-xl p-5 mb-5 shadow-sm"
              >
                <div className="flex justify-between mb-3">
                  <h3 className="font-semibold text-gray-700">
                    Question {i + 1}
                  </h3>
                  {questions.length > 1 && (
                    <button
                      onClick={() => removeQuestion(i)}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      ✕ Remove
                    </button>
                  )}
                </div>

                <textarea
                  rows="2"
                  placeholder="Type your question here..."
                  value={q.text}
                  onChange={(e) =>
                    handleQuestionChange(i, "text", e.target.value)
                  }
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 mb-3"
                />

                <div className="space-y-2">
                  {q.options.map((opt, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`correct-${i}`}
                        checked={q.correctOption === j}
                        onChange={() =>
                          handleQuestionChange(i, "correctOption", j)
                        }
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const newOpts = [...q.options];
                          newOpts[j] = e.target.value;
                          handleQuestionChange(i, "options", newOpts);
                        }}
                        placeholder={`Option ${j + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                ⬅ Back
              </button>
              <button
                type="submit"
                onClick={handleCreateQuiz}
                className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition"
              >
                ✅ Create Quiz
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreateQuiz;
