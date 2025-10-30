import express from "express";
import userController from "../controllers/UserController.js";

const router = express.Router();

router.post("/register", (req, res) => userController.registerUser(req, res));
router.post("/login", (req, res) => userController.loginUser(req, res));
router.post("/attempt/:title", (req, res) => userController.attemptQuiz(req, res));

export default router;
