import React, { useRef } from "react";
import styles from "../css/setTimeModal.module.css";

const SetTimeModal = ({ setTarget, setMode, setRun }) => {
  const targetHour = useRef();
  const targetMinute = useRef();

  return (
    <div className={styles.modal}>
      <input type="number" ref={targetHour} min="0" max="23" defaultValue="0" />
      <input
        type="number"
        ref={targetMinute}
        min="0"
        max="59"
        defaultValue="0"
      />

      <button
        onClick={() => {
          setTarget({
            hour: Number(targetHour.current.value),
            minute: Number(targetMinute.current.value),
          });
          setMode("normal");
          setRun(true);
        }}
      >
        설정
      </button>
    </div>
  );
};

export default SetTimeModal;
