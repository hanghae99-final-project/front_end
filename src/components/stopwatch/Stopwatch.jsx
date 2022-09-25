import React from "react";
import { useState, useEffect } from "react";
import SetWatchModal from "../modal/SetWatchModal";
import styles from "./stopwatch.module.css";
import { ReactComponent as Timer } from "../../common/svg/timer.svg";
import changeTimeForm from "../../utils/changeTimeForm";
import useInterval from "../../hooks/useInterval";
import font from "../../common/css/font.module.css";

const Stopwatch = ({ mode, setMode, color, setColor }) => {
  /** 현재시간 및 시작 시간 */
  const currentDate = new Date().getTime();

  /** 로컬에 있는 time값 불러오기 */
  const targetTime = Number(localStorage.getItem("targetTime"));
  const startTime = Number(localStorage.getItem("startTime"));
  const savedStudyTime = Number(localStorage.getItem("savedStudyTime"));

  const [time, setTime] = useState({ hour: 0, minute: 0, second: 0 });
  const [running, setRunning] = useState(false);
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

  /** reload 시 time이 저장되어 있고, 휴식 중이 아니라면 자동 시작 */
  if (!running && startTime > 0 && !stop && !localStorage.restStart) {
    setRunning(true);
  }

  /** reload 공부시간이 저장되어 있고, 휴식 중이라면 일시 정지 */
  if (!running && savedStudyTime > 0 && !stop && localStorage.restStart) {
    setRunning(true);
    setStop(true);
  }
  // 멈추기 할 때 없어진다. 왜?
  // 멈춘다 : true, 계속한다 : false
  // remainTime이 마이너스가 됨
  // 빨리하면 stop이 true인 채로 남아있게 되고,
  // 1초가 지나기 전에 하면 state가 업데이트가 안 되니까
  // -1664096074
  // 일단 1초동안 못 누르게 처리
  console.log(savedStudyTime); // 이게 왜 1664111161118 // 이게 왜 현재 시간이 나옴?
  if (targetTime > 0 && remainTime <= 0 && !stop) {
    localStorage.removeItem("startTime");
    localStorage.removeItem("targetTime");
    localStorage.removeItem("savedStudyTime");
    localStorage.removeItem("restStart");
    // setRunning(false);
    setStop(false);
    setTime({ hour: 0, minute: 0, second: 0 });
    setMode("complete");
    setColor("#7E7C8C");
  }

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
        />
      )}
    </div>
  );
};
export default Stopwatch;
