import React, { createContext, useContext, useReducer } from 'react';
import { userService } from '../services/userService.js';

const UserContext = createContext();

const initialState = {
  currentUser: null,
  users: [],
  loading: false,
  error: null,
  quizAttempts: [],
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload, loading: false };
    case 'SET_USERS':
      return { ...state, users: action.payload, loading: false };
    case 'ADD_QUIZ_ATTEMPT':
      return {
        ...state,
        quizAttempts: [...state.quizAttempts, action.payload]
      };
    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
        quizAttempts: []
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const registerUser = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      const response = await userService.registerUser(userData);
      dispatch({ type: 'SET_CURRENT_USER', payload: response.user });
      return response.user;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const fetchUsers = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      const users = await userService.getAllUsers();
      dispatch({ type: 'SET_USERS', payload: users });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const attemptQuiz = async (attemptData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      const response = await userService.attemptQuiz(attemptData);
      dispatch({ type: 'ADD_QUIZ_ATTEMPT', payload: response });
      return response;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const login = (userData) => {
    dispatch({ type: 'SET_CURRENT_USER', payload: userData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    registerUser,
    fetchUsers,
    attemptQuiz,
    login,
    logout,
    clearError,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
