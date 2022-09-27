import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./join.module.css";
import font from "../../common/css/font.module.css";
import round_cube from "../../common/svg/round_cube.png";
import "animate.css";

const Done = ({ nickname }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.doneLayout}>
      <div className={styles.msgContainer}>
        <img src={round_cube} alt="round_cube" class={styles.cube} />
        <div className={`${styles.doneMsg} ${font.header3_600_24}`}>
          <span className={`${styles.doneNickname}`}>{nickname}</span>
          님의 가입을
          <br />
          진심으로 축하드려요 :)
        </div>
        <span className={`${styles.joinDone} ${font.subtitle2_300_16}`}>랭플에서 회원님의 취업을 응원해요 </span>
      </div>
      <button
        className={`${styles.doneBtn} ${font.subtitle2_600_16}`}
        onClick={() => {
          navigate("/home");
        }}
      >
        시작하기
      </button>
    </div>
  );
};
export default Done;
