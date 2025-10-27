import {User} from "../models/User.js";
import {Quiz} from "../models/Quiz.js";
import QuizController from "./QuizController.js";

class UserController {

  // 🧍 Register a new user
  async registerUser(req, res) {
    const { name, email, password } = req.body;

    // Check if already exists
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser)
      return res.status(400).json({ message: "User already exists!" });

    const newUser = await User.create({name, email, password});
  
    res.status(201).json({ message: "User registered successfully!", user: newUser });
  }
  async loginUser(req,res) {
    const {email, password} = req.body;
    if(!email || !password){
      throw new Error("Enter all the required fields")
    }
    const user = await User.find(password);

    if(!user){
      throw new Error("Something went wrong");
    }

    return res.json("User logged in successfully", "User :", user)
  }

  // 🧩 Attempt a quiz
  async attemptQuiz(req, res) {
    const { title } = req.params;
    const {answers} = req.body;

    const quiz = await Quiz.find({title});
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // User attempts quiz
    const score = QuizController.calculateScore(answers);

    res.status(200).json({
      message: "Quiz attempted successfully!",
      user: user.name,
      quiz: quiz.title,
      score,
    });
  }
}

export default new UserController();
