import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { quizService } from '../services/quizService.js';

const QuizContext = createContext();

const initialState = {
  quizzes: [],
  currentQuiz: null,
  loading: false,
  error: null,
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SET_QUIZZES':
      return { ...state, quizzes: action.payload, loading: false };
    case 'SET_CURRENT_QUIZ':
      return { ...state, currentQuiz: action.payload, loading: false };
    case 'ADD_QUIZ':
      return { ...state, quizzes: [...state.quizzes, action.payload] };
    case 'ADD_QUESTION':
      return {
        ...state,
        currentQuiz: action.payload,
        quizzes: state.quizzes.map(quiz => 
          quiz.title === action.payload.title ? action.payload : quiz
        )
      };
    default:
      return state;
  }
};

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const fetchQuizzes = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      const quizzes = await quizService.getAllQuizzes();
      dispatch({ type: 'SET_QUIZZES', payload: quizzes });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const fetchQuizByTitle = async (title) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      const quiz = await quizService.getQuizByTitle(title);
      dispatch({ type: 'SET_CURRENT_QUIZ', payload: quiz });
      return quiz;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const createQuiz = async (quizData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      const newQuiz = await quizService.createQuiz(quizData);
      dispatch({ type: 'ADD_QUIZ', payload: newQuiz.quiz });
      return newQuiz.quiz;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const addQuestion = async (questionData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      const updatedQuiz = await quizService.addQuestion(questionData);
      dispatch({ type: 'ADD_QUESTION', payload: updatedQuiz.quiz });
      return updatedQuiz.quiz;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const clearCurrentQuiz = () => {
    dispatch({ type: 'SET_CURRENT_QUIZ', payload: null });
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const value = {
    ...state,
    fetchQuizzes,
    fetchQuizByTitle,
    createQuiz,
    addQuestion,
    clearError,
    clearCurrentQuiz,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
