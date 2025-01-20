const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "https://quiz-app-w54j.vercel.app", // Allow specific frontend domain
    methods: ["GET", "POST"], // Allow only GET and POST
    credentials: true,
  })
);
app.use(bodyParser.json());

// Health Check Endpoint
app.get("/", (req, res) => {
  res.send({ message: "Server is running successfully!" });
});

// Quiz Questions Endpoint with Caching
let cachedQuestions = null;
let cacheTimestamp = 0;
const CACHE_EXPIRATION_TIME = 30 * 60 * 1000; // Cache for 30 minutes

app.get("/api/questions", async (req, res) => {
  const currentTime = Date.now();

  // Check if cached data is still valid
  if (cachedQuestions && currentTime - cacheTimestamp < CACHE_EXPIRATION_TIME) {
    return res.json(cachedQuestions);
  }

  try {
    const response = await axios.get("https://opentdb.com/api.php?amount=15");
    cachedQuestions = response.data.results;
    cacheTimestamp = currentTime;
    res.json(cachedQuestions);
  } catch (err) {
    console.error("Error fetching quiz data:", err.message);
    res.status(500).send({ error: "Failed to fetch quiz data." });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


