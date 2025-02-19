import React, { createContext, useContext } from "react";

// Create a context for quiz data
export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  // Static quiz data (Replace this with API fetching if needed)
  const quizData = {
    "duration": 10, // Duration of the quiz in minutes
    "title": "General Knowledge Quiz",
    "topic": "General Knowledge",
    "correct_answer_marks": 1, // Marks awarded for a correct answer
    "negative_marks": 0, // No negative marking

    "questions": [
      // Multiple-choice question (type: "m")
      {
        "type": "m",
        "description": "Which planet is closest to the Sun?",
        "options": [
          { "description": "Venus", "is_correct": false },
          { "description": "Mercury", "is_correct": true },
          { "description": "Earth", "is_correct": false },
          { "description": "Mars", "is_correct": false }
        ]
      },
      {
        "type": "m",
        "description": "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
        "options": [
          { "description": "Stack", "is_correct": false },
          { "description": "Queue", "is_correct": true },
          { "description": "Tree", "is_correct": false },
          { "description": "Graph", "is_correct": false }
        ]
      },
      {
        "type": "m",
        "description": "Which of the following is primarily used for structuring web pages?",
        "options": [
          { "description": "Python", "is_correct": false },
          { "description": "Java", "is_correct": false },
          { "description": "HTML", "is_correct": true },
          { "description": "C++", "is_correct": false }
        ]
      },
      {
        "type": "m",
        "description": "Which chemical symbol stands for Gold?",
        "options": [
          { "description": "Au", "is_correct": true },
          { "description": "Gd", "is_correct": false },
          { "description": "Ag", "is_correct": false },
          { "description": "Pt", "is_correct": false }
        ]
      },
      {
        "type": "m",
        "description": "Which of these processes is not typically involved in refining petroleum?",
        "options": [
          { "description": "Fractional distillation", "is_correct": false },
          { "description": "Cracking", "is_correct": false },
          { "description": "Polymerization", "is_correct": false },
          { "description": "Filtration", "is_correct": true }
        ]
      },
      
      // Integer-based question (type: "i")
      {
        "type": "i",
        "description": "What is the value of 12 + 28?",
        "answer": "40"
      },
      {
        "type": "i",
        "description": "How many states are there in the United States?",
        "answer": "50"
      },
      {
        "type": "i",
        "description": "In which year was the Declaration of Independence signed?",
        "answer": "1776"
      },
      {
        "type": "i",
        "description": "What is the value of pi rounded to the nearest integer?",
        "answer": "3"
      },
      {
        "type": "i",
        "description": "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
        "answer": "120"
      }
    ]
  };

  const loading = false; // Set to `true` if fetching data from API
  const error = false; // Set to `true` if an error occurs while fetching

  return (
    <QuizContext.Provider value={{ quizData }}>
      {children} {/* Provides quiz data to all child components */}
    </QuizContext.Provider>
  );
};

// Custom hook to access quiz data from context
export const useQuizData = () => useContext(QuizContext);
