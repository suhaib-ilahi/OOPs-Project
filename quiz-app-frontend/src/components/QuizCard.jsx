import React from 'react';
import { Link } from 'react-router-dom';

const QuizCard = ({ quiz }) => {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {quiz.title}
          </h3>
          <p className="text-gray-600 mb-4">
            Created by: {quiz.creator}
          </p>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {quiz.questions?.length || 0} questions
          </div>
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/quiz/${encodeURIComponent(quiz.title)}`}
            className="btn-primary flex-1 text-center"
          >
            Take Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
