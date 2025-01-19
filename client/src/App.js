import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./components/StartPage";

import QuizPage from "./components/QuizPage";
import ReportPage from "./components/ReportPage";
console.log(StartPage); 

function App() {
  return (

    
    <Router>
      
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
