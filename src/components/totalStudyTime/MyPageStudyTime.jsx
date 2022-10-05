import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import changeTimeForm from "../../utils/changeTimeForm";
import styles from "../../pages/css/mypage.module.css";
import axios from "axios";
import { __getStudyTime } from "../../app/slice/timeTimerSlice";
import font from "../../common/css/font.module.css";
import useCalculate from "../../hooks/useCalculate";
import useInterval from "../../hooks/useInterval";
import { changeSecondToTime } from "../../utils/changeSecondToTime";

const MyPageStudyTime = () => {
  const dispatch = useDispatch();
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [run, setRun] = useState(false); // 타임타이머 동작 여부
  const [second, setSecond] = useState(0); // just '초'
  const { studyStartPoint, savedStudyTime, targetTime } = useSelector(state => state.timer);

  useEffect(() => {
    __getTotalStudyTime();
    if (targetTime === 0) {
      dispatch(__getStudyTime());
    }
  }, []);

  const __getTotalStudyTime = async () => {
    const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + `/mypage/getTotalStudyTime`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    setTotalStudyTime(Math.floor(data.totalStudyTime / 1000));
  };

  useInterval(run, false, setSecond);
  useCalculate(savedStudyTime, studyStartPoint, setSecond, setRun);

  return (
    <div className={styles.container}>
      <div className={styles.aboveArea}>
        <div className={`${styles.title} ${font.subtitle4_600_12}`}>오늘 공부시간</div>
        {changeTimeForm(second, `${styles.todayStudyTime} ${font.header_600_42}`)}
        <div className={`${styles.text} ${font.strikethrough_300_14}`}>
          누적 공부시간은{" "}
          <span className={`${styles.totalTime} ${font.strikethrough_600_14}`}>
            {changeSecondToTime(totalStudyTime)}
          </span>
          이에요
        </div>
      </div>
    </div>
  );
};

export default MyPageStudyTime;
