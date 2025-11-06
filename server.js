console.log("🟡 Server file starting...");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS Configuration (simple + works in both local & AWS)
app.use(
  cors({
    origin: "https://endearing-kataifi-0706f7.netlify.app/",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Connection
const MONGODB_URI =
  "mongodb+srv://nankit793_db_user:6Unrr9pq7vqmac2q@cluster0.sn2gd36.mongodb.net/mernapp?retryWrites=true&w=majority&appName=Cluster0";

// ✅ Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/topics", require("./routes/topicRoutes"));

// ✅ Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// ✅ Root Route (used for health check)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MERN API" });
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start Server (AWS requires 0.0.0.0 and process.env.PORT)
// Start server immediately - don't wait for MongoDB (for health checks)
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // Connect to MongoDB in the background (non-blocking)
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((error) => {
      console.error("❌ MongoDB connection error:", error);
      // Server continues running even if MongoDB fails
    });
});
