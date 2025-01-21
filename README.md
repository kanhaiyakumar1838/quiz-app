# Quiz Application

## Overview

This is a **Quiz Application** designed to allow users to take a quiz with multiple-choice questions. The application fetches quiz data from an external API (Open Trivia Database), displays questions, and tracks the user's answers. Upon completion, the user can submit their answers, and the results are stored in local storage.

### Features:
- Fetches quiz questions from the Open Trivia API.
- Displays each question with multiple-choice answers.
- Tracks user answers and stores them in local storage.
- Provides a timer to limit the time taken to answer.
- Navigates to a report page after quiz submission.

## Approach

The approach for this application follows these steps:
1. **Fetching Data**: I used the Open Trivia API to fetch quiz questions. Axios is used to send HTTP requests to the API.
2. **State Management**: React’s `useState` and `useEffect` hooks are used to manage the state of quiz questions, user answers, and the loading state.
3. **Timer**: A custom `Timer` component is included to handle the quiz countdown, which triggers the submission of answers once the time runs out.
4. **Routing**: React Router is used to navigate between pages like the quiz page and the report page.
5. **Error Handling**: There is error handling in place to catch any issues during data fetching or if the API rate limits are exceeded.

## Components

- **QuizPage.jsx**: This is the main page of the quiz, where users interact with the questions. It fetches the quiz data, displays questions, and captures answers.
- **Timer.jsx**: A countdown timer component that triggers the submission of the quiz when the time runs out.
- **ReportPage.jsx**: After the quiz is completed, users are redirected to this page, where their answers are shown.
- **API Integration**: Axios is used to fetch data from the Open Trivia API.

## Setup & Installation Instructions

### Prerequisites:
- [Node.js](https://nodejs.org/en/) (version 14.x or above)
- [npm](https://www.npmjs.com/get-npm)

### Steps to Run the Application Locally:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/quiz-app.git
    cd quiz-app
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Start the Application**:
    ```bash
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Assumptions Made

- The quiz data is being fetched from the Open Trivia API, which provides questions in a format compatible with this application.
- The application assumes that the user has a working internet connection to fetch quiz data from the API.
- Local storage is used for saving user answers, so they will persist within the session but will be lost if the user clears their browser history.

## Challenges Faced and How They Were Overcome

1. **API Rate Limiting**: During development, I encountered issues with the Open Trivia API rate limit. To overcome this, I implemented a retry mechanism in the code with exponential backoff to handle rate limit errors more gracefully.

2. **Error Handling for Missing Data**: At some point, the API did not return data in the expected format. I handled this by adding additional error checks to ensure the app fails gracefully and provides feedback to the user.

3. **Timer Synchronization**: Synchronizing the timer with the quiz’s state was tricky, especially to handle edge cases when the user answers quickly or when there are network delays. I solved this by carefully coordinating the timer’s events with the state updates in the app.

## Conclusion

This project helped me understand the importance of handling API rate limits, using local storage for state persistence, and providing a smooth user experience with clear error messages and loading indicators. I plan to further enhance the app with additional features like score reporting, timed quizzes, and better user interface components.
