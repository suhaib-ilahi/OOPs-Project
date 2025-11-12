import QuizService from "../services/QuizService.js";

class QuizController {

  // POST /quizzes
  async createQuiz(req, res) {
    try {
      const { title, creator } = req.body;
      if (!title || !creator) {
        return res.status(400).json({ message: "Both 'title' and 'creator' are required." });
      }
      console.log(req.body);
      const quiz = await QuizService.createQuiz(title, creator);
      return res.status(201).json({ message: "Quiz created successfully!", quiz });
    } catch (err) {
      // Handle duplicate title (unique index) and validation errors
      if (err.code === 11000 || /already exists/i.test(err.message)) {
        return res.status(409).json({ message: "Quiz title already exists." });
      }
      return res.status(400).json({ message: err.message || "Failed to create quiz." });
    }
  }

  // POST /quizzes/questions  (body: { title, text, options, correctOption })
  async addQuestion(req, res) {
    try {
      const { title } = req.params;
      const {  text, options, correctOption } = req.body;
      console.log(title);
      
      if (!title || (!text && !options && !correctOption)) {
        return res.status(400).json({ message: "title, text, options and correctOption are required." });
      }

      const updatedQuiz = await QuizService.addQuestion(title, text, options, correctOption); 
      return res.status(201).json({ message: "Question added successfully!", quiz: updatedQuiz });
    } catch (err) {
      if (/Quiz not found/i.test(err.message)) {
        return res.status(404).json({ message: "Quiz not found." });
      }
      return res.status(400).json({ message: err.message || "Failed to add question." });
    }
  }

  // GET /quizzes
  async getAllQuizzes(req, res) {
    try {
      const quizzes = await QuizService.getAllQuizzes();
      return res.json(quizzes);
    } catch (err) {
      return res.status(500).json({ message: err.message || "Failed to fetch quizzes." });
    }
  }

  // GET /quizzes/:title
  async getQuizByTitle(req, res) {
    try {
      const { title } = req.params;
      if (!title) return res.status(400).json({ message: "Title param is required." });

      const quiz = await QuizService.getQuizByTitle(title);
      return res.json(quiz);
    } catch (err) {
      if (/Quiz not found/i.test(err.message)) {
        return res.status(404).json({ message: "Quiz not found." });
      }
      return res.status(400).json({ message: err.message || "Failed to fetch quiz." });
    }
  }

  // Optional: POST /quizzes/:title/score  (body: { answers: [...] })
  async calculateScore(req, res) {
    try {
      const { title } = req.params;
      const { answers } = req.body;

      if (!title) return res.status(400).json({ message: "Title param is required." });
      if (!Array.isArray(answers)) return res.status(400).json({ message: "answers must be an array." });

      const result = await QuizService.calculateQuizScore(title, answers);
      return res.json(result);
    } catch (err) {
      if (/Quiz not found/i.test(err.message)) {
        return res.status(404).json({ message: "Quiz not found." });
      }
      return res.status(400).json({ message: err.message || "Failed to calculate score." });
    }
  }

  // Optional admin helper: DELETE /quizzes/:title
  async deleteQuizByTitle(req, res) {
    try {
      const { title } = req.params;
      if (!title) return res.status(400).json({ message: "Title param is required." });

      await QuizService.deleteQuizByTitle(title);
      return res.json({ message: "Quiz deleted successfully." });
    } catch (err) {
      if (/Quiz not found/i.test(err.message)) {
        return res.status(404).json({ message: "Quiz not found." });
      }
      return res.status(400).json({ message: err.message || "Failed to delete quiz." });
    }
  }
}

export default new QuizController();
