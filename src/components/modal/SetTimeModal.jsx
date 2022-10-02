import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { __postTargetTime } from "../../app/slice/timeTimerSlice";
import styles from "./setTimeModal.module.css";
import { ReactComponent as Close } from "../../common/svg/close.svg";
import SetTimePicker from "./SetTimePicker";
import font from "../../common/css/font.module.css";

const SetTimeModal = ({ time, setTime, setMode, targetToSec }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.modal}>
      <div className={`${styles.title} ${font.subtitle2_600_16}`}>
        <div>목표 설정시간</div>
        <Close
          className={styles.close}
          onClick={() => {
            setMode("normal");
          }}
        />
      </div>
      <SetTimePicker setTime={setTime} time={time} />
      <button
        className={`${styles.startBtn} ${font.subtitle2_600_16}`}
        onClick={() => {
          setMode("normal");
          dispatch(__postTargetTime({ targetTime: targetToSec * 1000 }));
        }}
      >
        설정하기
      </button>
    </div>
  );
};

export default memo(SetTimeModal);
