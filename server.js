<<<<<<< HEAD
// server.js (ESM)
import cors from "cors";
import express from "express";

const app = express();
const PORT = process.env.PORT || 5001; // use 5001 to avoid macOS system service on 5000

app.use(cors()); // allow cross-origin requests
app.use(express.json());

app.get("/api/message", (req, res) => {
  // return `text` to match frontend's `data.text` usage
  res.json({ text: "LeafX backend is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
  process.exit(1);
});
=======
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";

// Load environment variables
dotenv.config();

// Validate required environment variables
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is required but not set in environment variables");
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  retryWrites: true
};

// Routes
app.use("/api/users", userRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "LeafX backend is running!",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  console.error(err.stack);
  res.status(500).json({ 
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5002;

// Start server and connect to MongoDB
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, mongoOptions);
    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 API root: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

startServer();
>>>>>>> 75797b4 (Enhanced MongoDB Integration and API Testing)
