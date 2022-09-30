import React from "react";
import styles from "../../components/timeTimer/timeTimer.module.css";
import font from "../../common/css/font.module.css";
import changeTimeForm from "../../utils/changeTimeForm";
import setting from "../../common/svg/setting_icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeColor } from "../../app/slice/layoutColorSlice";

const CircleTimer = ({ sec, second, targetTime, run, setTimeMode, targetToSec, status }) => {
  const color = useSelector(state => state.color);
  const dispatch = useDispatch();
  useEffect(() => {
    if (Math.floor(targetTime / 1000) <= second && color === "green") {
      dispatch(changeColor("red"));
    }
  }, [second]);
  return (
    <div className={styles.baseTimer}>
      <div className={styles.a}>
        <svg className={styles.baseSvg} viewBox="0 0 102 103" xmlns="http://www.w3.org/2000/svg">
          <g className={styles.baseTimerCircle}>
            <circle className={styles.basePath} cx="51" cy="51" r="45" />
            <path
              strokeDasharray={`${sec} 283`}
              className={
                second === 0
                  ? styles.pathBlack
                  : color === "blue"
                  ? styles.pathBlue
                  : second >= targetTime / 1000 && second !== 0
                  ? styles.pathRed
                  : styles.pathGreen
              }
              d="
          M 51, 52
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
            ></path>
          </g>
        </svg>
        <div className={styles.b}>
          <span className={styles.timerLabel}>
            {!run && (
              <div className={styles.targetTime}>
                <button
                  className={styles.setTime}
                  onClick={() => {
                    setTimeMode("set");
                  }}
                >
                  <img src={setting} alt="시간설정" />
                </button>
              </div>
            )}
            <div className={styles.targetTime}>
              {changeTimeForm(targetToSec, `${styles.target} ${font.header3_600_24}`)}
              <br />
            </div>
            {changeTimeForm(second, `${styles.mainTimerTime} ${font.header_600_42}`)}
            <div className={`${styles.status} ${font.caption_300_12}`}>{status}</div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CircleTimer;
