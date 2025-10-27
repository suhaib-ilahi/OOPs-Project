import api from './api.js';

export const userService = {
  // Register a new user
  registerUser: async (userData) => {
    try {
      const response = await api.post('/users/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to register user');
    }
  },

  // Get all users
  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch users');
    }
  },

  // Attempt a quiz
  attemptQuiz: async (attemptData) => {
    try {
      const response = await api.post('/users/attempt', attemptData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit quiz attempt');
    }
  },
};
