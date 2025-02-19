import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../Styles/Result.module.css";
import { saveQuizAttempt } from "../Utils/indexedDB.js";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract quiz result data from state
  const { score, attempted, unattempted, correct, incorrect, accuracy, pm, len } = location.state;
  const timeTaken = new Date().toISOString(); // Store attempt timestamp

  let p = Number(pm);
  let l = Number(len);

  // Calculate progress percentage
  let progress = (score / (p * l)) * 100;

  // Determine rank based on progress
  let rank =
    progress >= 90 ? ["Warlord", "👑"] :
    progress >= 60 ? ["Vanguard", "🎖️"] :
    progress >= 30 ? ["Recruited", "🔰"] :
    ["Novice", "⚪"];

  // Save quiz attempt to IndexedDB when the component mounts
  useEffect(() => {
    const saveAttempt = async () => {
      const attemptData = {
        id: Date.now(), // Unique ID for each attempt
        timestamp: timeTaken, // Store when the attempt was made
        score,
        attempted,
        unattempted,
        correct,
        incorrect,
        accuracy,
        totalQuestions: len,
      };

      await saveQuizAttempt(attemptData); // Save attempt data to IndexedDB
      console.log("Attempt saved successfully!", attemptData);
    };

    saveAttempt();
  }, []); // Runs only once to prevent duplicate entries

  // Navigate back to the quiz for a reattempt
  const handleReattempt = () => {
    navigate("/");
  };

  return (
    <div className={styles.quizContainer}>
      <div className={styles.result}>
        <h2 style={{ textAlign: "center" }}>Quiz Completed!</h2>
        <hr />
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", minWidth: "50%" }}>
          {/* Left Side - Quiz Summary */}
          <div style={{ flex: 1 }}>
            <p>Score: {score} / {p * l}</p>
            <p>Attempted: {attempted}</p>
            <p>Unattempted: {unattempted}</p>
            <p>Correct: {correct}</p>
            <p>Incorrect: {incorrect}</p>
            <p style={{ color: "black", fontWeight: "bold", fontSize: "18px" }}>Accuracy: {accuracy}%</p>
          </div>

          {/* Right Side - Rank Display */}
          <div className={styles.gg}>
            <h1 className={styles.headingr}> Rank </h1>
            <h4 className={styles.emoji}>{rank[1]}</h4>
            <h4 className={styles.rank}>{rank[0]}</h4>
          </div>
        </div>

        <hr />

        {/* Buttons for reattempting or viewing quiz history */}
        <div style={{ textAlign: "center" }} className={styles.reattemptButtonContainer}>
          <button className={styles.reattemptButton} onClick={handleReattempt}>
            Reattempt Quiz
          </button>
          <button
            style={{ marginLeft: "20px" }}
            onClick={() => navigate("/history")}
            className={styles.reattemptButton}
          >
            Quiz History
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
