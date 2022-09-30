import React from "react";
import { useState, useEffect } from "react";
import SetWatchModal from "../modal/SetWatchModal";
import styles from "./stopwatch.module.css";
import { ReactComponent as Timer } from "../../common/svg/timer.svg";
import changeTimeForm from "../../utils/changeTimeForm";
import useInterval from "../../hooks/useInterval";
import font from "../../common/css/font.module.css";

const Stopwatch = ({ mode, setMode, color, setColor, running, setRunning }) => {
  /** 현재시간 및 시작 시간 */
  const currentDate = new Date().getTime();

  /** 로컬에 있는 time값 불러오기 */
  const targetTime = Number(localStorage.getItem("targetTime"));
  const startTime = Number(localStorage.getItem("startTime"));
  const savedStudyTime = Number(localStorage.getItem("savedStudyTime"));

  const [time, setTime] = useState({ hour: 0, minute: 0, second: 0 });
  const [stop, setStop] = useState(false);

  /**
   * 단순히 1초마다 렌더링 시키기 위한 state
   * 다른 것으로 바꿀 수 있을까?
   */
  const [second, setSecond] = useState(0);

  /** 남은 시간 */
  const remainTime =
    targetTime === 0
      ? 0
      : stop
      ? Math.floor((targetTime - savedStudyTime) / 1000)
      : Math.floor((targetTime - savedStudyTime - (startTime === 0 ? 1 : currentDate - startTime)) / 1000);

  useEffect(() => {
    /** reload 시 time이 저장되어 있고, 휴식 중이 아니라면 자동 시작 */
    if (!running && startTime > 0 && !stop && !localStorage.restStart) {
      setRunning(true);
    }

    /** reload 공부시간이 저장되어 있고, 휴식 중이라면 일시 정지 */
    if (!running && savedStudyTime > 0 && !stop && localStorage.restStart) {
      setRunning(true);
      setStop(true);
    }
  }, []);

  const initializeTime = () => {
    localStorage.removeItem("startTime");
    localStorage.removeItem("targetTime");
    localStorage.removeItem("savedStudyTime");
    localStorage.removeItem("restStart");
    setStop(false);
    setTime({ hour: 0, minute: 0, second: 0 });
    setColor("#7E7C8C");
    console.log("hi");
  };

  useEffect(() => {
    /** 시간 도달 시 초기화 */
    if (targetTime > 0 && remainTime <= 0 && !stop) {
      initializeTime();
      setMode("complete");
    }
  }, [second]);

  /** 스톱워치 시간 증가 로직 */
  useInterval(running, stop, setSecond);

  /** running이 바뀌었을 때, startTime을 local에 저장 */
  useEffect(() => {
    if (running && !stop && !localStorage.startTime) {
      localStorage.setItem("startTime", currentDate);
    }
  }, [running, stop]);

  /** stop했을 때,  startTime을 제거 */
  useEffect(() => {
    if (running && stop && localStorage.startTime) {
      localStorage.removeItem("startTime");
    }
  }, [stop]);

  return (
    <div className={styles.stopwatchBox}>
      <div className={styles.stopwatch}>
        {running && <div className={styles.remainTime}>{changeTimeForm(remainTime, font.caption_600_12)}</div>}
        <Timer
          onTouchStart={() => {
            setColor("#C7C5D0");
          }}
          onTouchEnd={() => {
            setColor("#66FFA6");
          }}
          className={styles.clock}
          onClick={() => {
            setMode("set");
          }}
          fill={targetTime > 0 ? "#66FFA6" : color}
        />
      </div>
      {(mode === "complete" || mode === "set") && (
        <SetWatchModal
          setRunning={setRunning}
          changeTimeForm={changeTimeForm}
          running={running}
          time={time}
          setTime={setTime}
          setStop={setStop}
          stop={stop}
          setMode={setMode}
          mode={mode}
          remainTime={remainTime}
          currentDate={currentDate}
          startTime={startTime}
          savedStudyTime={savedStudyTime}
          setColor={setColor}
          initializeTime={initializeTime}
        />
      )}
    </div>
  );
};
export default Stopwatch;
