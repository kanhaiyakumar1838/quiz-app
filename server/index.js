const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const CACHE_EXPIRATION_TIME = process.env.CACHE_EXPIRATION_TIME || 30 * 60 * 1000;
//const allowedOrigins = process.env.ALLOWED_ORIGINS || "https://quiz-app-w54j.vercel.app";
const allowedOrigins = process.env.ALLOWED_ORIGINS || "http://localhost:3000,https://quiz-app-w54j.vercel.app";


let cachedQuestions = null;
let cacheTimestamp = 0;

// Middleware
app.use(cors({
  origin: allowedOrigins.split(","),
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(bodyParser.json());

// Serve Static Files
// Remove or comment out this part
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}


// Health Check
app.get("/", (req, res) => {
  res.send({
    message: "Server is running successfully!",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// Quiz Questions Endpoint
app.get("/api/questions", async (req, res) => {
  const currentTime = Date.now();

  if (cachedQuestions && currentTime - cacheTimestamp < CACHE_EXPIRATION_TIME) {
    console.log("Serving questions from cache");
    return res.json(cachedQuestions);
  }

  try {
    const response = await axios.get("https://opentdb.com/api.php?amount=15");
    cachedQuestions = response.data.results;
    cacheTimestamp = currentTime;
    console.log("Fetched new questions from API");
    res.json(cachedQuestions);
  } catch (err) {
    console.error("Error fetching quiz data:", err.message);
    res.status(500).send({ error: "Failed to fetch quiz data." });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message);
  res.status(err.status || 500).send({ error: "Something went wrong. Please try again later." });
});

// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("Shutting down server...");
  process.exit(0);
});
process.on("SIGTERM", () => {
  console.log("Server terminated!");
  process.exit(0);
});

// Start Server
app.listen(PORT, () => {
  const environment = process.env.NODE_ENV || "development";
  console.log(`Server is running in ${environment} mode on port ${PORT}`);
});
