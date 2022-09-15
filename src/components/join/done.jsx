import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./joincss/join.module.css";

const Done = ({ nickname }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.layout}>
      <div className={styles.msgContainer}>
        <div className={styles.doneMsg}>
          <span className={styles.doneNickname}>{nickname}</span>
          님의 가입을
          <br />
          진심으로 축하드려요🎉
        </div>
        <span className={styles.joinDone}>
          랭플에서 회원님의 취업을 응원해요 :)
        </span>
      </div>
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
