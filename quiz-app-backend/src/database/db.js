// database.js
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

class Database {
  constructor() {
    this.isConnected = false;
  }

  async connect() {
    if (this.isConnected) {
      console.log("Already connected to MongoDB");
      return;
    }

    try {
      const uri = process.env.MONGO_URI || "mongodb://localhost:27017/QuizApp";
      const conn = await mongoose.connect(uri);

      this.isConnected = mongoose.connection.readyState;
      console.log("✅ MongoDB connected:", conn.connection.host);
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error.message);
      process.exit(1);
    }
  }

  async disconnect() {
    if (!this.isConnected) return;

    await mongoose.disconnect();
    this.isConnected = false;
    console.log("🔌 MongoDB disconnected");
  }

  isHealthy() {
    return this.isConnected;
  }
}

const db = new Database();
export default db;
