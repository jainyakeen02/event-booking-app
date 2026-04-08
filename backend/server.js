import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import Event from "./models/Event.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

// Auto delete past events
const deletePastEvents = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = await Event.deleteMany({
      date: { $lt: today },
    });

    console.log("Auto deleted past events:", result.deletedCount);
  } catch (error) {
    console.log("Auto delete error:", error.message);
  }
};

// Start server
const startServer = async () => {
  try {
    await connectDB();
    await deletePastEvents();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Server start error:", error.message);
  }
};

startServer();
