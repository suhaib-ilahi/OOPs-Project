import api from './api.js';

export const quizService = {
  // Get all quizzes
  getAllQuizzes: async () => {
    try {
      const response = await api.get('/quizzes');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch quizzes');
    }
  },

  // Get quiz by title
  getQuizByTitle: async (title) => {
    try {
      const response = await api.get(`/quizzes/${title}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch quiz');
    }
  },

  // Create a new quiz
  createQuiz: async (quizData) => {
    try {
      const response = await api.post('/quizzes/create', quizData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create quiz');
    }
  },

  // Add question to quiz
  addQuestion: async (questionData) => {
    try {
      const response = await api.post('/quizzes/add-question', questionData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add question');
    }
  },
};
