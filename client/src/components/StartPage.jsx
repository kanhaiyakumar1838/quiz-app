import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StartPage.css"; // Import the CSS file

const StartPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // State to hold email validation error
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex to validate email format

  const startQuiz = () => {
    // Validate email format
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError(""); // Clear the error if email is valid
    localStorage.setItem("email", email); // Store email in localStorage
    navigate("/quiz"); // Navigate to quiz page
  };

  return (
    <div className="start-page">
      <div className="start-page-container">
        <h1>Welcome to the Ultimate Quiz</h1>
        <p>Test your knowledge and challenge yourself with our exciting quiz!</p>
        
        {/* Email input field */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email on change
          className="start-page-input"
        />
        
        {/* Display error message if email is invalid */}
        {emailError && <div className="error-message">{emailError}</div>}

        {/* Start Quiz button */}
        <button onClick={startQuiz} className="start-page-button">
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StartPage;
