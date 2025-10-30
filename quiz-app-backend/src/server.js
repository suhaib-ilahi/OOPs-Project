// server.js
import dotenv from "dotenv";
dotenv.config();

import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"


import quizRoutes from "./routes/quiz.routes.js";
import userRoutes from "./routes/user.routes.js";
import db from "./database/db.js";

const app = express();

// ----- Middleware -----
console.log(process.env.CORS_ORIGINS);

app.use(cors({ origin: process.env.CORS_ORIGINS, credentials: true }));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser())

// ----- Routes (mounted after body parsing) -----
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 9000;

async function start() {
  try {
    // Ensure db.connect is async and throws on failure
    if (typeof db.connect === "function") {
      await db.connect();
    } else {
      console.warn("db.connect is not a function — make sure your database module exports a connect() function");
    }
    const server = app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
     });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
