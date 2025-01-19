import React from "react";
import { useNavigate } from "react-router-dom";

const ReportPage = () => {
  const navigate = useNavigate();
  const answers = JSON.parse(localStorage.getItem("quizAnswers")) || {};
  const questions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
  const email = localStorage.getItem("email");

  // Calculate score
  let score = 0;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Quiz Report</h1>
      <p><strong>User:</strong> {email}</p>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {questions.map((question, idx) => {
          const correctAnswer = question.correct_answer;
          const selectedAnswer = answers[idx];
          const isCorrect = selectedAnswer === correctAnswer;

          // Increment score if the answer is correct
          if (isCorrect) score++;

          return (
            <li
              key={idx}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <p>
                <strong>Question {idx + 1}:</strong> {question.question}
              </p>
              <p>
                <strong>Correct Answer:</strong>{" "}
                <span style={{ color: "green" }}>{correctAnswer}</span>
              </p>
              {selectedAnswer ? (
                <p>
                  <strong>Your Answer:</strong>{" "}
                  <span
                    style={{
                      color: isCorrect ? "green" : "red",
                    }}
                  >
                    {selectedAnswer}
                  </span>
                </p>
              ) : (
                <p>
                  <strong>Your Answer:</strong>{" "}
                  <span style={{ color: "orange" }}>Not Attempted</span>
                </p>
              )}
            </li>
          );
        })}
      </ul>
      <h2>
        Final Score: {score} / {questions.length}
      </h2>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Restart
      </button>
    </div>
  );
};

export default ReportPage;
