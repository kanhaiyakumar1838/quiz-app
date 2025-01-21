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

<<<<<<< HEAD
=======
/*<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8ba27f9 (Initial server setup for deployment)
>>>>>>> 1df40fc (Resolved merge conflict in server/index.js)
// Serve Static Files from React App in Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Fallback route to serve React's index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

<<<<<<< HEAD
=======
=======
>>>>>>> 63d6bc7c94296122b57fa98f97f47cadd8e2d952*/
>>>>>>> 1df40fc (Resolved merge conflict in server/index.js)
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
