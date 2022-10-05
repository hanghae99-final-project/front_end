import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getStudyTime, __postStudyStart, __postRestStart, __postRestEnd } from "../../app/slice/timeTimerSlice";
import SetTimeModal from "../modal/SetTimeModal";
import styles from "./timeTimer.module.css";
import "../../common/css/color.css";
import { changeColor } from "../../app/slice/layoutColorSlice";
import Quote from "../quote/Quote";
import useInterval from "../../hooks/useInterval";
import CircleTimer from "../../pages/mainPage/CircleTimer";
import ButtonBox from "../../pages/mainPage/ButtonBox";
import { Blur } from "../../pages/mainPage/Styled";
import useCalculate from "../../hooks/useCalculate";
import { changeSecondToTime } from "../../utils/changeSecondToTime";

const TimeTimer = () => {
  const date = new Date().getTime();
  const dispatch = useDispatch();
  const { studyStartPoint, savedStudyTime, restStartPoint, savedRestTime, targetTime, yesterdayStudyTime } =
    useSelector(state => state.timer);

  const [refresh, setRefresh] = useState(false);
  const [timeMode, setTimeMode] = useState("normal");
  const [target, setTarget] = useState({ hour: 0, minute: 0 });
  const [targetToSec, setTargetToSec] = useState(0); // 설정시간을 초로 나타냄
  const [status, setStatus] = useState(yesterdayStudyTime || 0); // 어제 얼마나 공부했는지/ 현재 남은시간은 몇시간인지 상태를 나타냄

  const [rest, setRest] = useState(false); // 휴식 관리
  const [run, setRun] = useState(false); // 타임타이머 동작 여부
  const [second, setSecond] = useState(0); // just '초'
  const [restSecond, setRestSecond] = useState(0);

  const remainSec = targetToSec - parseInt(second); // setStatus 작동을 위한 두번째 시간과 분

  useEffect(() => {
    dispatch(__getStudyTime());
  }, [dispatch]);

  /** 일 초마다 색을 판별하는 함수 */
  useEffect(() => {
    if (studyStartPoint !== 0) {
      dispatch(changeColor(second >= targetTime / 1000 ? "red" : "green"));
    } else if (restStartPoint !== 0) {
      dispatch(changeColor("blue"));
    } else if (studyStartPoint === 0 && restStartPoint === 0) {
      dispatch(changeColor(""));
    }
  }, [restStartPoint, studyStartPoint, second]);

  /**
   * 버튼 클릭 시 1초에 한 번씩 second를 업데이트 하도록 설정
   * 스톱워치는 휴식시간을 체크하지 않지만
   * timeTimer는 휴식시간도 체크하기 때문에 두 개의 useInterval 사용
   */
  useInterval(run, rest, setSecond);
  useInterval(rest, run, setRestSecond, "rest");

  /** 공부 중일 때 각각에 맞는 시간을 설정하는 함수 */
  useCalculate(savedStudyTime, studyStartPoint, setSecond, setRun);

  /** 휴식 중일 때 각각에 맞는 시간을 설정하는 함수 */
  useCalculate(savedRestTime, restStartPoint, setRestSecond);

  useEffect(() => {
    setTargetToSec(target.hour * 3600 + target.minute * 60);
  }, [target]);

  useEffect(() => {
    remainSec !== 0
      ? second > targetTime / 1000 || remainSec < 0
        ? setStatus("🎉 목표를 달성했어요 !")
        : setStatus(`⏰ ${changeSecondToTime(remainSec)} 남았어요!`)
      : setStatus(`✏️ 어제 ${changeSecondToTime(Math.floor(yesterdayStudyTime / 1000))}공부했어요`);
  }, [second, targetToSec, yesterdayStudyTime]);

  useEffect(() => {
    setTargetToSec(targetTime / 1000);
  }, [targetTime]);

  /** 휴식 중일 때 새로고침 시 자동으로 휴식이 진행되게 설정 */
  useEffect(() => {
    if (restStartPoint !== 0) {
      setRun(false);
      setRest(true);
    }
  }, [restStartPoint]);

  /**
   * 공부를 시작하기 전에 렌더링이 진행되지 않아서
   * mount 되었을 때의 시간을 받아오는 것을 방지하기 위해
   * 시작 버튼을 클릭하면 state를 업데이트 시킨 후에 서버에 전송하도록 설정
   */
  useEffect(() => {
    if (refresh) {
      dispatch(__postStudyStart({ studyStartPoint: date, notificationToken: localStorage.getItem("fcmToken") }));
    }
  }, [refresh]);
  return (
    <div className={styles.layout}>
      <CircleTimer
        second={second}
        targetTime={targetTime}
        run={run}
        setTimeMode={setTimeMode}
        targetToSec={targetToSec}
        status={status}
      />
      <Quote />
      <ButtonBox
        run={run}
        rest={rest}
        restSecond={restSecond}
        restStartPoint={restStartPoint}
        targetTime={targetTime}
        setTimeMode={setTimeMode}
        second={second}
        setRefresh={setRefresh}
        setRun={setRun}
        setRest={setRest}
        date={date}
      />
      {timeMode === "set" && (
        <>
          <SetTimeModal
            targetToSec={targetToSec}
            setTarget={setTargetToSec}
            time={target}
            setTime={setTarget}
            setMode={setTimeMode}
          />
          <Blur
            onClick={() => {
              setTimeMode("normal");
            }}
          />
        </>
      )}
    </div>
  );
};

export default TimeTimer;
