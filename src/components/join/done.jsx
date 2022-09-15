import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./joincss/join.module.css";

const Done = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.layout}>
      <div className={styles.msgContainer}></div>
      <div className={styles.doneMsg}></div>
      <button
        className={styles.doneBtn}
        onClick={() => {
          navigate("/");
        }}
      >
        시작하기
      </button>
    </div>
  );
};
export default Done;
