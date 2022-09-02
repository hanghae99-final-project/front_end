import React, { useState, useEffect } from "react";
import SetTimeModal from "./SetTimeModal";

const TimeTimer = () => {
  const [run, setRun] = useState(false);
  const [target, setTarget] = useState({});
  const [mode, setMode] = useState("normal");
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

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
    if (second === 60) {
      setSecond(0);
      setMinute((prev) => prev + 1);
    } else if (minute === 60) {
      setMinute(0);
      setHour((prev) => prev + 1);
    }
  }, [hour, minute, second]);
  useEffect(() => {
    if (
      target !== {} &&
      target.hour === hour &&
      target.minute === minute &&
      target.second === second
    ) {
      alert("목표시간 도달");
    }
  }, [target, hour, minute, second]);

  return (
    <div>
      <p>timer</p>
      {target.hour && target.minute && target.second === 0 ? (
        <>
          <span>00:</span>
          <span>00:</span>
          <span>00</span>
          <br />
        </>
      ) : (
        <div>
          <span> {target.hour < 10 ? "0" + target.hour : target.hour}:</span>
          <span>
            {" "}
            {target.minute < 10 ? "0" + target.minute : target.minute}:
          </span>
          <span>
            {target.second < 10 ? "0" + target.second : target.second}{" "}
          </span>
          <br />
        </div>
      )}

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
      <span> {hour < 10 ? "0" + hour : hour}:</span>
      <span> {minute < 10 ? "0" + minute : minute}:</span>
      <span> {second < 10 ? "0" + second : second}</span>
      {run ? (
        <button onClick={() => setRun(false)}>휴식</button>
      ) : (
        <button onClick={() => setRun(true)}>공부</button>
      )}
      <button>종료하기</button>
      {mode === "set" && (
        <SetTimeModal setMode={setMode} setTarget={setTarget} />
      )}
    </div>
  );
};

export default TimeTimer;
