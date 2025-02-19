
import React, { useState } from "react";
import styles from "../Styles/Pbar.module.css";

const ProgressBar = ({ progress }) => {
    const [op,setop]=useState([0.4,0.4,0.4]);
    if(progress>=30){
        op[0]=1;
        if(progress>=60){
            op[1]=1;
            if(progress>=90){
                op[2]=1;
            }
            else{
                op[2]=0.4;
            }
        }
        else{
            op[1]=0.4;
            op[2]=0.4;
        }
    }else{
        op[0]=0.4;
        op[1]=0.4;
        op[2]=0.4;
    }
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar} style={{ width: `${progress}%` }}>

      </div>
      
      { <span className={styles.badge} style={{ left: "30%" ,fontSize:"30px",opacity:op[0]}}>🔰</span>}
      { <span className={styles.badge} style={{ left: "60%" ,fontSize:"30px",opacity:op[1]}}>🎖️</span>}
      { <span className={styles.badge} style={{ left: "90%" ,fontSize:"30px",opacity:op[2]}}>👑</span>}
      
    </div>
  );
};

export default ProgressBar;
