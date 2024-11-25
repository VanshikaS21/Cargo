import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/Authentication/SignUp.js";
import userRoute from "./routes/UserData.js";
import rideRoute from "./routes/RideData.js";
import cron from "node-cron"; // Import node-cron
import Ride from "./models/rideSchema.js"; // Import your ride model

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

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/ride", rideRoute);

// Cron job to update rides to 'completed' if the ride date has passed
cron.schedule('* * * * *', async () => {
  try {
    const currentTime = new Date(); // Current date and time

    // Create a date object for the start of today (midnight)
    const startOfToday = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate()
    );

    // Find rides where the date is strictly before today
    const ridesToUpdate = await Ride.find({
      date: { $lt: startOfToday }, // Strictly before today's midnight
      rideState: { $ne: 'cancelled' }, // Not cancelled
    });

    // Update the state of these rides to 'completed'
    for (const ride of ridesToUpdate) {
      ride.rideState = 'completed'; // Change the state to 'completed'
      await ride.save(); // Save the updated ride state
    }

    console.log(`Updated ${ridesToUpdate.length} rides to 'completed' state.`);
  } catch (error) {
    console.error("Error while updating ride states:", error);
  }
});




// Set up port and start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port: ${port}`));
