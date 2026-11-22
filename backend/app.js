
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import noteRoutes from "./routes/noteRoute.js";
import connectDB from "./config/database.js";

const app = express();

app.use(cors());
app.use(express.json());

// Ensure MongoDB is connected before processing API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res.status(503).json({
      message: "Database connection unavailable",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Notify API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

export default app;
