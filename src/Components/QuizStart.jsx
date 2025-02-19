import React from "react";
import styles from '../Styles/QuizApp.module.css';
import { useQuizData } from "../Context/Context";
import { useNavigate } from "react-router-dom";
const QuizPage = () => {

const { quizData} = useQuizData();
    const navigate = useNavigate();
  return (
    <div className={styles.quizPage}>
      <div className={styles.quizContainer}>
        <h1 className={styles.quizTitle}>{quizData.title}</h1>
        <p className={styles.quizTopic}>Topic: <span>{quizData.topic}</span></p>
        
        <div className={styles.quizDetails}>
          <p><strong>Duration:</strong> <span>{quizData.duration+" mins"}</span></p>
          <p><strong>Positive Mark:</strong> <span>{quizData.correct_answer_marks}</span></p>
          <p><strong>Negative Mark:</strong> <span>{quizData.negative_marks}</span></p>
        </div>

        <button onClick={()=>{
            navigate('/quiz');
        }} className={styles.startButton}>Start Quiz</button>
        <button 
        style={{marginLeft:"20px"}}
        onClick={()=>{
            navigate('/history');
        }} className={styles.startButton}>Quiz History</button>
      </div>
    </div>
  );
};

export default QuizPage;
