import React, { useState, useEffect } from "react";
import axios from "axios";
import Timer from "./Timer";
import { useNavigate } from "react-router-dom";
import "./QuizPage.css";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visitedQuestions, setVisitedQuestions] = useState(new Set());
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/questions")
      .then((response) => {
        setQuestions(response.data);
        localStorage.setItem("quizQuestions", JSON.stringify(response.data)); // Save to localStorage
      })
      .catch((err) => console.error(err));
  }, []);
  

  const handleAnswer = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const submitQuiz = () => {
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    navigate("/report");
  };

  const navigateToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setVisitedQuestions((prev) => new Set(prev.add(index)));
  };

  const toggleFlag = (index) => {
    setFlaggedQuestions((prev) => {
      const updatedFlags = new Set(prev);
      if (updatedFlags.has(index)) {
        updatedFlags.delete(index);
      } else {
        updatedFlags.add(index);
      }
      return updatedFlags;
    });
  };

  if (errorMessage) return <div className="error-message">{errorMessage}</div>;
  if (!questions.length) return <div className="loading">Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const options = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ].sort();

  return (
    <div className="quiz-container">
      <Timer onTimeUp={submitQuiz} />
      <h2 className="quiz-question">{currentQuestion.question}</h2>
      <div className="options-container">
        {options.map((option, idx) => (
          <button
            key={idx}
            className={`option-button ${
              answers[currentQuestionIndex] === option ? "selected" : ""
            }`}
            onClick={() => handleAnswer(currentQuestionIndex, option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="navigation-buttons">
        <button
          className="nav-button"
          disabled={currentQuestionIndex === 0}
          onClick={() => navigateToQuestion(currentQuestionIndex - 1)}
        >
          Previous
        </button>
        <button
          className="nav-button"
          disabled={currentQuestionIndex === questions.length - 1}
          onClick={() => navigateToQuestion(currentQuestionIndex + 1)}
        >
          Next
        </button>
        <button
          className={`flag-button ${
            flaggedQuestions.has(currentQuestionIndex) ? "flagged" : ""
          }`}
          onClick={() => toggleFlag(currentQuestionIndex)}
        >
          {flaggedQuestions.has(currentQuestionIndex) ? "Unflag" : "Flag"}
        </button>
      </div>
      <div className="overview-panel">
        <h3>Question Overview</h3>
        <div className="overview-container">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`overview-button ${
                answers[index]
                  ? "attempted"
                  : visitedQuestions.has(index)
                  ? "visited"
                  : ""
              } ${flaggedQuestions.has(index) ? "flagged" : ""} ${
                index === currentQuestionIndex ? "current" : ""
              }`}
              onClick={() => navigateToQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <button className="submit-button" onClick={submitQuiz}>
        Submit
      </button>
    </div>
  );
};

export default QuizPage;
