import React from "react";
import styles from "./setTimeModal.module.css";
import SetTimePicker from "./SetTimePicker";
import { ReactComponent as Close } from "../../common/svg/close.svg";
import font from "../../common/css/font.module.css";
import { useState } from "react";
import Button from "./Button";
import { useEffect } from "react";

const SetWatchModal = ({
  startTime,
  savedStudyTime,
  currentDate,
  remainTime,
  changeTimeForm,
  stop,
  setMode,
  setStop,
  running,
  setRunning,
  time,
  setTime,
  setColor,
  mode,
  initializeTime
}) => {
  const [able, setAble] = useState(false);

  const onRunningHandler = () => {
    setMode("normal");
    setRunning(!running);
    running
      ? initializeTime()
      : localStorage.setItem("targetTime", (Number(time.hour) * 3600 + Number(time.minute) * 60) * 1000);
  };

  const onStopHandler = () => {
    setStop(!stop);
    setAble(true);
    setTimeout(() => {
      setAble(false);
    }, 1050);
    if (stop) {
      localStorage.removeItem("restStart");
    } else {
      localStorage.setItem("savedStudyTime", savedStudyTime + currentDate - startTime);
      localStorage.setItem("restStart", true);
    }
  };

  return (
    <div className={localStorage.targetTime > 0 || mode === "complete" ? styles.setModal : styles.modal}>
      <div className={`${styles.title} ${font.subtitle2_600_16}`}>
        <div>{mode === "complete" ? "타이머 종료" : "타이머"}</div>
        <Close
          className={styles.close}
          onClick={() => {
            setMode("normal");
            setColor("#7E7C8C");
            mode === "complete" && setRunning(false);
          }}
        />
      </div>
      {!running ? (
        <>
          <SetTimePicker setTime={setTime} time={time} />
          <div className={styles.buttonBox}>
            <Button onClickHandler={onRunningHandler} type="long">
              시작하기
            </Button>
          </div>
        </>
      ) : (
        <>
          {changeTimeForm(remainTime, `${styles.remainTime} ${font.header_600_42}`)}
          <div className={styles.buttonBox}>
            {mode === "complete" ? (
              <Button onClickHandler={onRunningHandler} type="long">
                확인
              </Button>
            ) : !stop ? (
              <Button type="short" able={able} onClickHandler={onStopHandler}>
                멈추기
              </Button>
            ) : (
              <Button type="short" able={able} onClickHandler={onStopHandler}>
                계속하기
              </Button>
            )}
            {mode !== "complete" && (
              <Button type="end" onClickHandler={onRunningHandler}>
                종료하기
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SetWatchModal;
