import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/Quiz.module.css";
import { useQuizData } from "../Context/Context";
import ProgressBar from "./Pbar";
import { PiTimerBold } from "react-icons/pi";

const Quiz = () => {
  const { quizData } = useQuizData();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [inputAnswer, setInputAnswer] = useState("");
  const [answerSelected, setAnswerSelected] = useState(false);

  // Countdown timer for each question, skips when time runs out
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prev) => prev - 1);
      } else {
        handleSkip();
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [timeLeft]);

  // Move to the next question or finish the quiz if it's the last one
  const handleSkip = () => {
    setAnswerSelected(false);

    if (currentQuestion === quizData.questions.length - 1) {
      setTimeout(() => {
        finishQuiz();
      }, 200); // Delay to ensure state updates before finishing
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(60);
      setInputAnswer("");
    }
  };

  // Handles multiple-choice question selection
  const handleAnswerClick = (option) => {
    if (answers[currentQuestion] !== undefined || answerSelected) return;

    const isCorrect = option.is_correct;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion]: { isCorrect, selectedOption: option },
    }));

    setScore((prevScore) => prevScore + (isCorrect ? 1 : 0));

    setAnswerSelected(true);

    // Wait 2 seconds before moving to the next question
    setTimeout(() => {
      handleSkip();
    }, 2000);
  };

  // Handles user input for integer-type questions
  const handleInputChange = (e) => {
    setInputAnswer(e.target.value);
  };

  const handleSubmitIntegerAnswer = () => {
    if (answers[currentQuestion] !== undefined || answerSelected) return;

    const correctAnswer = quizData.questions[currentQuestion].answer;
    const isCorrect = inputAnswer.trim() === correctAnswer;

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion]: { isCorrect, selectedOption: inputAnswer },
    }));

    setScore((prevScore) => prevScore + (isCorrect ? 1 : 0));

    setAnswerSelected(true);

    // Wait 2 seconds before moving to the next question
    setTimeout(() => {
      handleSkip();
    }, 2000);
  };

  // Ensures the last answer is counted before finishing the quiz
  useEffect(() => {
    if (currentQuestion === quizData.questions.length - 1 && answerSelected) {
      setTimeout(() => {
        finishQuiz();
      }, 200);
    }
  }, [currentQuestion, answerSelected]);

  // Calculate final results and navigate to the result page
  const finishQuiz = () => {
    setAnswers((prevAnswers) => {
      const finalAttempted = Object.keys(prevAnswers).length;
      const finalCorrect = Object.values(prevAnswers).filter((answer) => answer.isCorrect).length;
      const finalIncorrect = finalAttempted - finalCorrect;
      const finalAccuracy = finalAttempted > 0 ? ((finalCorrect / finalAttempted) * 100).toFixed(2) : "0.00";

      navigate("/result", {
        state: {
          score: finalCorrect, // Ensure the final score is used
          attempted: finalAttempted,
          unattempted: quizData.questions.length - finalAttempted,
          correct: finalCorrect,
          incorrect: finalIncorrect,
          accuracy: finalAccuracy,
          len: quizData.questions.length,
          pm: 1,
        },
      });

      return prevAnswers;
    });
  };

  return (
    <div className={styles.quizContainer}>
      <div className={styles.questionContainer}>
        <ProgressBar progress={(score / quizData.questions.length) * 100} />

        <div className={styles.timer}>
          <div style={{ marginTop: "2px" }}>
            <PiTimerBold size={26} />
          </div>
          Time Left: {timeLeft} sec
        </div>

        <h3 className={styles.question}>
          {quizData.questions[currentQuestion].description}
        </h3>

        <div className={styles.options}>
          {quizData.questions[currentQuestion].type === "m" ? (
            // Render multiple-choice options
            quizData.questions[currentQuestion].options.map((option, index) => {
              const selectedAnswer = answers[currentQuestion]?.selectedOption;
              const isCorrect = option.is_correct;
              const isSelected = selectedAnswer === option;

              return (
                <button
                  key={index}
                  className={`${styles.option} ${
                    selectedAnswer
                      ? isCorrect
                        ? styles.correct
                        : isSelected
                        ? styles.wrong
                        : ""
                      : ""
                  }`}
                  onClick={() => handleAnswerClick(option)}
                  disabled={!!selectedAnswer || answerSelected}
                >
                  {index + 1}. {option.description}
                </button>
              );
            })
          ) : (
            // Render input box for integer-type questions
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px", justifyContent: "center" }}>
              <input
                type="text"
                value={inputAnswer}
                onChange={handleInputChange}
                placeholder="Enter answer"
                disabled={answers[currentQuestion] !== undefined || answerSelected}
                style={{
                  alignSelf: "center",
                  padding: "10px",
                  border: "2px solid #ccc",
                  borderRadius: "5px",
                  fontSize: "16px",
                  width: "100px",
                }}
              />
              <button
                onClick={handleSubmitIntegerAnswer}
                disabled={answers[currentQuestion] !== undefined || answerSelected}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Submit
              </button>
            </div>
          )}
        </div>

        {/* Display correct answer after user selects an option */}
        {answers[currentQuestion] && (
          <p className={styles.correctAnswer}>
            Correct Answer:{" "}
            <span>
              {quizData.questions[currentQuestion].type === "m"
                ? quizData.questions[currentQuestion].options.find(
                    (opt) => opt.is_correct
                  ).description
                : quizData.questions[currentQuestion].answer}
            </span>
          </p>
        )}

        {/* Skip Button (Moves to Next Question) */}
        <div className={styles.navButtons}>
          <button
            onClick={handleSkip}
            disabled={answerSelected}
            style={{
              padding: "10px 20px",
              backgroundColor: answerSelected ? "#b67373" : "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginTop: "10px",
            }}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
