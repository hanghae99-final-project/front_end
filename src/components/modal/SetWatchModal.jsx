import React from "react";
import styles from "./setTimeModal.module.css";
import SetTimePicker from "./SetTimePicker";
import { ReactComponent as Close } from "../../common/svg/close.svg";
import font from "../../common/css/font.module.css";
import { useState } from "react";
import Button from "./Button";
import { useEffect } from "react";
import ModalTitle from "./ModalTitle";

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

  /** running일 때 누르면 종료 후 초기화, running이 아닐 때 누르면 시간 설정 후 실행 */
  const onRunningHandler = () => {
    setMode("normal");
    setRunning(!running);
    running
      ? initializeTime()
      : localStorage.setItem("targetTime", (Number(time.hour) * 3600 + Number(time.minute) * 60) * 1000);
  };

  /** 타이머가 running일 때 누르면 시간을 저장하고, stop일 때 누르면 휴식을 종료시키는 함수  */
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
      <ModalTitle
        title={mode === "complete" ? "타이머 종료" : "타이머"}
        func={() => {
          setMode("normal");
          setColor("#7E7C8C");
          mode === "complete" && setRunning(false);
        }}
      />
      {!running ? (
        <>
          <SetTimePicker setTime={setTime} time={time} />
          <div className={styles.buttonBox}>
            <Button type="long" onClickHandler={onRunningHandler}>
              시작하기
            </Button>
          </div>
        </>
      ) : (
        <>
          {changeTimeForm(remainTime, `${styles.remainTime} ${font.header_600_42}`)}
          <div className={styles.buttonBox}>
            {mode === "complete" ? (
              <Button type="long" onClickHandler={onRunningHandler}>
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
