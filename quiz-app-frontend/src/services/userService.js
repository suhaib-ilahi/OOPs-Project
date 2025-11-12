import api from './api.js';

export const userService = {
  // Register a new user
  registerUser: async (userData) => {
    try {
      const response = await api.post("v1/users/register", userData);
      console.log(response);
      
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to register user"
      );
    }
  },

  // ✅ Login an existing user
  loginUser: async (credentials) => {
    try {
      // credentials = { email, password } 
      const response = await api.post("v1/users/login", credentials);
      return response.data; // e.g. { user, token }
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Invalid email or password"
      );
    }
  },

  // Attempt a quiz
  attemptQuiz: async (attemptData) => {
    try {
      const response = await api.post("v1/users/attempt/", attemptData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to submit quiz attempt"
      );
    }
  },
};
