import React, { useState } from "react";
import styles from "./joincss/join.module.css";
import arrowBtn from "../../svg/arrowback_icon.svg";
import deleteBtn from "../../svg/delete_icon.svg";
// import { ReactComponent as Remove } from "../../delete_icon.svg";

const Nickname = ({ setMode, nickname, handleInput }) => {
  const [ctColor, setCtColor] = useState("inputContainer");
  const [checkMsg, setCheckMsg] = useState("8자리의 한글만 사용이 가능해요.");

  const check = /^[가-힣]{2,8}$/;
  // if (!name.test(nickname) ) {
  // }

  return (
    <div className={styles.layout}>
      <div>
        <div>
          <img className={styles.arrowbackIcon} src={arrowBtn} alt="arrow" />
        </div>
        <p className={styles.infoText}>
          사용하실 닉네임을
          <br /> 입력해 주세요
        </p>
        <div className={`${styles}.${ctColor}`}>
          <div className={styles.InputGroup}>
            <label className={styles.label}>닉네임</label>
            <input
              type="text"
              name="nickname"
              className={styles.inputNickname}
              value={nickname}
              onChange={handleInput}
              placeholder="8자 이내 한글"
              autoComplete="off"
              maxLength="8"
            ></input>
          </div>
          <div>
            <img
              className={styles.deleteIcon}
              src={deleteBtn}
              alt="deleteBtn"
            />
          </div>
        </div>
        <p className={styles.checkMsg}>{checkMsg}</p>
        {nickname === "" ? (
          //  && !checkMsg === green ?
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
