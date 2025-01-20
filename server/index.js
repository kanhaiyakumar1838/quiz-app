const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const cors = require("cors");
app.use(cors({
  origin: "quiz-app-w54j.vercel.app" // Replace with your frontend domain
}));


app.use(bodyParser.json());

<<<<<<< HEAD
// Serve Static Files from React Build
app.use(express.static(path.join(__dirname, "build")));  // Updated path to the build folder
=======
// Serve Static Files from React App in Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Fallback route to serve React's index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}
>>>>>>> 2c6ea31fddab233e48437be0adb6e370b6e64262

// Health Check Endpoint
app.get("/", (req, res) => {
  res.send({ message: "Server is running successfully!" });
});

// Quiz Questions Endpoint
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

<<<<<<< HEAD
// Fallback Route for React App
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

=======
>>>>>>> 2c6ea31fddab233e48437be0adb6e370b6e64262
// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
