import React, { useEffect, useState } from "react";
import { getQuizHistory, clearQuizHistory } from "../Utils/indexedDB.js";
import { useNavigate } from "react-router-dom";

const QuizHistory = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getQuizHistory();
      setHistory(data);
    };

    fetchHistory();
  }, []);

  // Clears all quiz history from IndexedDB and updates state
  const handleClearHistory = async () => {
    await clearQuizHistory();
    setHistory([]); // Reset history state after clearing
  };

  return (
    <div style={{
      marginTop: "20px",
      padding: "10px",
      width: "90%",
      justifySelf: "center",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
    }}>
      <h2 style={{ textAlign: "center", color: "#c010d3", marginBottom: "20px" }}>
        Quiz Attempt History
      </h2>

      {/* Display message if no quiz attempts exist */}
      {history.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "16px", color: "#666" }}>
          No attempts recorded yet.
        </p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {history.map((attempt, index) => (
            <li key={index} style={{
              padding: "12px",
              marginBottom: "10px",
              background: "#fff",
              borderRadius: "6px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }}>
              <p style={{ margin: "5px 0", fontSize: "14px" }}>
                <strong style={{ color: "#007bff" }}>Date:</strong> {new Date(attempt.timestamp).toLocaleString()}
              </p>
              <p style={{ margin: "5px 0", fontSize: "14px" }}>
                <strong style={{ color: "#28a745" }}>Score:</strong> {attempt.score} / {attempt.totalQuestions}
              </p>
              <p style={{ margin: "5px 0", fontSize: "14px" }}>
                <strong style={{ color: "#17a2b8" }}>Accuracy:</strong> {attempt.accuracy}%
              </p>
              <p style={{ margin: "5px 0", fontSize: "14px" }}>
                <strong style={{ color: "#dc3545" }}>Attempted:</strong> {attempt.attempted}, 
                <strong style={{ color: "#6c757d", marginLeft: "5px" }}>Unattempted:</strong> {attempt.unattempted}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* Navigation and clear history buttons */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px"
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "12px 18px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
        >
          Start New Quiz
        </button>

        <button
          onClick={handleClearHistory}
          style={{
            padding: "12px 18px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#a71d2a"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#dc3545"}
        >
          Clear History
        </button>
      </div>
    </div>
  );
};

export default QuizHistory;
