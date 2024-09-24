import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/Authentication/SignUp.js";
// Load environment variables
dotenv.config();

// Database connection
const db = async () => {
  try {
    const URI = process.env.DATABASE;
    await mongoose.connect(URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Error occurred during MongoDB connection:", error);
  }
};

// Initialize Express app
const app = express();

// Connect to MongoDB
db();

// Middleware
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/api/auth", authRoute);

const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => console.log(`Server running on port: ${port}`));
