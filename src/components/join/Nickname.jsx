import React, { useEffect, useState } from "react";
import "animate.css";
import styles from "./join.module.css";
import arrowBtn from "../../common/svg/arrowback_icon.svg";
import { ReactComponent as Orange } from "../../common/svg/orange.svg";
import { ReactComponent as Red } from "../../common/svg/red.svg";
import { ReactComponent as Green } from "../../common/svg/green.svg";
import font from "../../common/css/font.module.css";
import axios from "axios";

const Nickname = ({ setMode, nickname, checkMsg, setCheckMsg, initialState, userInfo, setUserInfo }) => {
  const [borderColor, setBorderColor] = useState("");
  const check = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,12}$/;

  const checkNickname = e => {
    if (!check.test(userInfo.nickname)) {
      setBorderColor("orange");
      setCheckMsg("이모티콘,공백은 사용 불가능해요");
    } else {
      axios
        .get(process.env.REACT_APP_SERVER_URL + `/profile/nick/${nickname}`, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`
          }
        })
        .then(res =>
          res.data.ok === true
            ? (setBorderColor("green"), setCheckMsg("사용 가능한 닉네임이에요"))
            : (setBorderColor("red"), setCheckMsg("이미 존재하는 닉네임이에요"))
        );
    }
  };

  const allCheck = () => {
    borderColor === "green" && check.test(userInfo.nickname) ? setMode("Age") : void 0;
  };

  useEffect(() => {
    setBorderColor("");
    setCheckMsg("2~12자의 닉네임을 설정해주세요");
    const timer = setTimeout(() => {
      checkNickname();
    }, 500);
    if (userInfo.nickname === "") {
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [userInfo]);

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.btnWrap}>
          <img className={styles.arrowbackIcon} src={arrowBtn} alt="arrow" />
        </div>
        <p className={`${styles.infoText} ${font.header3_600_24}`}>
          사용하실 닉네임을
          <br /> 입력해 주세요
        </p>
        <div
          className={
            nickname !== "" && borderColor === "red"
              ? `${styles.red} animate__animated animate__headShake`
              : nickname !== "" && borderColor === "green"
              ? styles.green
              : nickname !== "" && borderColor === "orange"
              ? `${styles.orange} animate__animated animate__headShake`
              : styles.inputContainer
          }
        >
          <form className={styles.InputGroup} onSubmit={checkNickname}>
            <label className={`${styles.label} ${font.caption_300_12}`}>닉네임</label>
            <input
              type="text"
              name="nickname"
              className={`${styles.inputNickname} ${font.body_300_16}`}
              value={nickname}
              onChange={e => {
                setUserInfo({ ...userInfo, nickname: e.target.value });
              }}
              placeholder="8자 이내 한글"
              autoComplete="off"
              autoFocus={true}
              maxLength="12"
              spellCheck={false}
            ></input>
          </form>
          <div className={styles.buttonBox}>
            <span className={`${styles.nicknameLength} ${font.caption_300_12}`}>{nickname.length}/12</span>
            <button
              className={styles.deleteIcon}
              onClick={() => {
                setUserInfo(initialState);
                setBorderColor("");
              }}
            />
          </div>
        </div>
        <p
          className={
            borderColor === "orange"
              ? `${styles.checkMsgOrange} ${font.caption2_300_10}`
              : borderColor === "green"
              ? `${styles.checkMsgGreen} ${font.caption2_300_10}`
              : borderColor === "red"
              ? `${styles.checkMsgRed} ${font.caption2_300_10}`
              : `${styles.checkMsg} ${font.caption2_300_10}`
          }
        >
          {borderColor === "orange" && <Orange style={{ marginRight: "0.25rem" }} />}
          {borderColor === "red" && <Red style={{ marginRight: "0.25rem" }} />}
          {borderColor === "green" && <Green style={{ marginRight: "0.25rem" }} />}
          {checkMsg}
        </p>
      </div>
      {borderColor !== "green" ? (
        <button className={`${styles.joinBtnNo} ${font.subtitle2_600_16}`} disabled>
          다음
        </button>
      ) : (
        <button
          className={`${styles.joinBtnYes} ${font.subtitle2_600_16}`}
          onClick={e => {
            checkNickname(e, true);
            allCheck();
          }}
        >
          다음
        </button>
      )}
    </div>
  );
};

export default Nickname;
