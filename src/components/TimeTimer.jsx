import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_studytime } from "../app/slice/timeTimerSlice";
import SetTimeModal from "./SetTimeModal";
import styles from "../css/timeTimer.module.css";

const TimeTimer = () => {
  const dispatch = useDispatch();
  const [targetToSec, setTargetToSec] = useState();
  const get_time = useSelector((state) => state.timer);
  const [status, setStatus] = useState(0);
  const [run, setRun] = useState(false);
  const [rest, setRest] = useState(false);
  const [target, setTarget] = useState("");
  const [mode, setMode] = useState("normal");
  const [second, setSecond] = useState(0);
  const sec = second * (283 / targetToSec);
  const remainSec = targetToSec - parseInt(second);

  const hour = parseInt(second / 3600);
  const minutes = parseInt((second % 3600) / 60);
  const seconds = second % 60;

  const hour2 = parseInt(remainSec / 3600);
  const minutes2 = parseInt((remainSec % 3600) / 60);

  // const colorCode = { info: { color: "#ffffff" } };
  // let PathColor = colorCode.info.color;

  useEffect(() => {
    dispatch(get_studytime());
  }, []);

  // console.log(get_time);

  useEffect(() => {
    let interval;
    if (run) {
      interval = setInterval(() => {
        setSecond((prev) => prev + 1);
      }, 1000);
    } else if (!run) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [run]);

  useEffect(() => {
    if (!isNaN(targetToSec)) {
      setTargetToSec(target.hour * 3600 + target.minute * 60);
    } else {
      setTargetToSec(1);
    }
  }, [target, run]);
  useEffect(() => {
    !isNaN(hour2) && !isNaN(minutes2)
      ? setStatus(`${hour2}시간 ${minutes2}분 남았어요!`)
      : setStatus(`어제 2시간 10분 공부했어요`);
    if (target !== {} && targetToSec === second) {
      alert("목표시간 도달");
      setRun(false);
      setStatus("목표량을 다 채웠어요!");
    }
  }, [target, second]);

  return (
    <div className={styles.layout}>
      <p>timer</p>

      <div className={styles.baseTimer}>
        <div className={styles.a}>
          <svg
            className={styles.baseSvg}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className={styles.baseTimerCircle}>
              <circle className={styles.basePath} cx="50" cy="50" r="45" />
              <path
                strokeDasharray={`${sec} 283`}
                className={styles.pathRemaining}
                d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
              ></path>
            </g>
          </svg>
          <div className={styles.b}>
            <span className={styles.timerLabel}>
              {!run ? (
                <div className={styles.targetTime}>
                  {mode === "normal" ? (
                    <button
                      onClick={() => {
                        setMode("set");
                      }}
                    >
                      시간 설정
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setMode("normal");
                      }}
                    >
                      닫기
                    </button>
                  )}
                  <br />
                </div>
              ) : (
                <div className={styles.targetTime}>
                  <span>
                    {target.hour < 10 ? "0" + target.hour : target.hour}:
                  </span>
                  <span>
                    {target.minute < 10 ? "0" + target.minute : target.minute}:
                  </span>
                  <span>00</span>
                  <br />
                </div>
              )}

              <span>{hour < 10 ? `0${hour}` : `${hour}`}:</span>
              <span>{minutes < 10 ? `0${minutes}` : `${minutes}`}:</span>
              <span>{seconds < 10 ? `0${seconds}` : `${seconds}`}</span>
              <div className={styles.status}>{status}</div>
            </span>
          </div>
        </div>
      </div>

      {run ? (
        <button
          onClick={() => {
            setRun(false);
            setRest(true);
          }}
        >
          휴식
        </button>
      ) : rest === true ? (
        <button
          onClick={() => {
            setRun(true);
            setRest(false);
          }}
        >
          공부
        </button>
      ) : (
        <button disabled>공부</button>
      )}
      <button>종료하기</button>
      {mode === "set" && (
        <SetTimeModal setMode={setMode} setTarget={setTarget} setRun={setRun} />
      )}
    </div>
  );
};

export default TimeTimer;
