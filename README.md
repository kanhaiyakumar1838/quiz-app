# Quiz Application

## Overview
This Quiz Application is designed to provide users with a set of questions and track their answers. It consists of two main parts:

1. **Frontend**: A React-based web application that interacts with the backend API to fetch quiz questions and submit user answers.
2. **Backend**: A Node.js-based server that provides the quiz data and handles requests from the frontend.

The application offers users a simple and interactive interface to take quizzes and view results. Users can answer the questions, navigate between them, and submit their answers. 

## Features
- Timer to limit the duration for answering each quiz.
- Navigate between questions (Next and Previous buttons).
- Submit answers and view results.

## Technologies Used
- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express
- **Database**: In-memory data for simplicity (for demo purposes)

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

2. **Running the Frontend**:
    - Navigate to the `client` directory:
      ```bash
      cd client
      ```
    - Install the necessary dependencies:
      ```bash
      npm install
      ```
    - Start the frontend:
      ```bash
      npm start
      ```

3. **Running the Backend**:
    - Navigate to the `server` directory:
      ```bash
      cd ../server
      ```
    - Install the necessary dependencies:
      ```bash
      npm install
      ```
    - Start the backend:
      ```bash
      node index.js
      ```

4. Open your browser and navigate to `http://localhost:3000` to view the frontend application, and ensure the backend is running at `http://localhost:5000`.

## Assumptions
- The backend API is hosted locally on `http://localhost:5000` and provides the necessary quiz data through the `/api/questions` endpoint.
- The frontend is hosted on `http://localhost:3000` and communicates with the backend API to fetch and display quiz data.

## Challenges Faced and How I Overcame Them
1. **Handling API Rate Limits**: During development, the Open Trivia API (used for fetching quiz questions) faced rate-limiting issues. To address this, I switched to using a local mock API for testing and later incorporated rate-limiting handling in production.
2. **Timer Management**: Implementing a countdown timer that resets after each quiz and stops once time is up. The issue was resolved by using React's `useEffect` hook to manage the timer state.
3. **Frontend-Backend Communication**: Ensuring seamless communication between the frontend and backend. I encountered issues with CORS, which were resolved by setting appropriate headers in the Express backend.

## Future Enhancements
- Implement user authentication to track quiz history.
- Improve the backend to handle larger question datasets.
- Add user scores and feedback after quiz completion.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
