import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./joincss/join.module.css";

const Done = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.layout}>
      <div className={styles.doneMsg}>회원가입 완료</div>
      <button
        className={styles.doneBtn}
        onClick={() => {
          navigate("/");
        }}
      >
        홈으로가자
      </button>
    </div>
  );
};
export default Done;
