import React from "react";
import styles from "./joincss/join.module.css";
// import arrow from '../../../';
// import { ReactComponent as Remove } from "../../delete_icon.svg";

const Nickname = ({ setMode, nickname, handleInput, userInfo }) => {
  console.log(nickname);
  return (
    <div className={styles.layout}>
      <div>
        <div>{/* <img src={arrow} alt="arrow" /> */}</div>
        <p className={styles.infoText}>
          사용하실 닉네임을
          <br /> 입력해 주세요
        </p>
        <div className={styles.inputContainer}>
          <div className={styles.InputBox}>
            <label className={styles.label}>닉네임</label>
            <input
              type="text"
              name="nickname"
              value={nickname}
              onChange={handleInput}
              placeholder="8자 이내 한글"
              autoComplete="off"
              maxLength="8"
            ></input>
          </div>
        </div>
        <span>1123</span>
        {nickname === "" ? (
          <button className={styles.joinBtnNo} disabled>
            다음
          </button>
        ) : (
          <button className={styles.joinBtnYes} onClick={() => setMode("Age")}>
            다음
          </button>
        )}
      </div>
    </div>
  );
};

export default Nickname;
