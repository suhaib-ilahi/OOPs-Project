import express from "express";
import userController from "../controllers/UserController.js";

const router = express.Router();

router.post("/register", (req, res) => userController.registerUser(req, res));
router.get("/", (req, res) => userController.getAllUsers(req, res));
router.post("/attempt", (req, res) => userController.attemptQuiz(req, res));

export default router;
