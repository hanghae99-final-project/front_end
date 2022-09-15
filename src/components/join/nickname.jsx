import React, { useState } from "react";
import "animate.css";
import styles from "./joincss/join.module.css";
import arrowBtn from "../../svg/arrowback_icon.svg";
import deleteBtn from "../../svg/delete_icon.svg";
import { __checkNickname } from "../../app/slice/joinSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { ReactComponent as Remove } from "../../delete_icon.svg";

const Nickname = ({
  setMode,
  nickname,
  handleInput,
  checkMsg,
  setCheckMsg,
  initialState,
  userInfo,
  setUserInfo,
}) => {
  const check = /^[가-힣]{2,8}$/;
  const [borderColor, setBorderColor] = useState("");
  const nicknameUsable = useSelector((data) => data.join.ok);
  const dispatch = useDispatch();
  console.log(nicknameUsable);
  console.log(borderColor);

  const combineHandler = () => {
    dispatch(__checkNickname(nickname));
    !nicknameUsable ? setBorderColor("red") : setBorderColor("");
  };

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.btnWrap}>
          <img className={styles.arrowbackIcon} src={arrowBtn} alt="arrow" />
        </div>
        <p className={styles.infoText}>
          사용하실 닉네임을
          <br /> 입력해 주세요
        </p>
        <div
          className={
            nickname !== "" && borderColor === "red"
              ? styles.red
              : styles.inputContainer
          }
        >
          <div className={styles.InputGroup}>
            <label className={styles.label}>닉네임</label>
            <input
              type="text"
              name="nickname"
              className={styles.inputNickname}
              onBlur={combineHandler}
              // onKeyPress={combineHandler}
              value={nickname}
              onChange={handleInput}
              placeholder="8자 이내 한글"
              autoComplete="off"
              autoFocus={true}
              maxLength="8"
            ></input>
          </div>
          <div>
            <img
              className={styles.deleteIcon}
              src={deleteBtn}
              alt="deleteBtn"
              onClick={() => {
                setUserInfo(initialState);
                setBorderColor("");
              }}
            />
          </div>
        </div>
        <p className={styles.checkMsg}>{checkMsg}</p>
      </div>
      {check.test(userInfo.nickname) && !nicknameUsable ? (
        <button className={styles.joinBtnNo} disabled>
          다음
        </button>
      ) : (
        <button className={styles.joinBtnYes} onClick={() => setMode("Age")}>
          다음
        </button>
      )}
    </div>
  );
};

export default Nickname;
