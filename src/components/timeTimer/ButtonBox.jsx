import React from "react";
import styles from "./timeTimer.module.css";
import font from "../../common/css/font.module.css";
import { useDispatch } from "react-redux";
import { changeColor } from "../../app/slice/layoutColorSlice";
import { __postRestStart, __postRestEnd, __postStudyEnd } from "../../app/slice/timeTimerSlice";
import changeTimeForm from "../../utils/changeTimeForm";
import setting from "../../common/svg/setting_icon.svg";
import pause from "../../common/svg/pause_icon.svg";
import { ReactComponent as Play } from "../../common/svg/play_icon.svg";
import StopButton from "./StopButton";

const ButtonBox = ({
  run,
  rest,
  restSecond,
  restStartPoint,
  targetTime,
  setTimeMode,
  second,
  setRefresh,
  setRun,
  setRest,
  date
}) => {
  const dispatch = useDispatch();

  const endTimer = () => {
    setRefresh(false);
    setRun(false);
    setRest(false);
    dispatch(changeColor(""));
    dispatch(__postStudyEnd(restStartPoint !== 0 ? { restEndPoint: date } : { studyEndPoint: date }));
  };

  /**
   * 휴식 버튼을 관리하는 함수
   * 휴식을 취하고 있을 때 클릭 시 작동하게 하고,
   * 작동하고 있을 때 색을 변경하며 휴식
   * @param {*} func dispatch할 함수
   */
  const restHandler = func => {
    setRest(!rest);
    if (rest) {
      setRun(true);
    } else {
      dispatch(changeColor("blue"));
      setRefresh(false);
    }
    dispatch(func);
  };

  const currentStatus = second >= targetTime / 1000 ? true : false;

  return (
    <div className={styles.buttonBox}>
      {!run && !rest ? (
        targetTime === 0 ? (
          <button
            className={styles.settingBtn}
            onClick={() => {
              setTimeMode("set");
            }}
          >
            <div className={styles.settingBox}>
              <img src={setting} alt="목표 설정" className={styles.setting} />
            </div>
            <div className={`${styles.text}  ${font.subtitle2_600_16}`}>목표설정</div>
          </button>
        ) : (
          <button
            className={currentStatus ? styles.redBtn : styles.playBtn}
            onClick={() => {
              setRefresh(true);
              setRun(true);
              dispatch(changeColor(currentStatus ? "red" : "green"));
            }}
          >
            <div className={styles.playBox}>
              <Play className={styles.setting} fill={currentStatus ? "var(--neutral-100)" : "var(--neutral-10)"} />
            </div>
            <div className={`${currentStatus ? styles.redText : styles.playText} ${font.subtitle2_600_16}`}>
              시작하기
            </div>
          </button>
        )
      ) : (
        <div className={styles.studingButtonBox}>
          {!rest ? (
            <button
              className={styles.restStartBtn}
              onClick={() => restHandler(__postRestStart({ restStartPoint: date, studyEndPoint: date }))}
            >
              <img src={pause} alt="휴식하기" />
              <div className={styles.restTextBox}>
                <div className={`${styles.restText} ${font.subtitle2_600_16}`}>휴식하기</div>
                {changeTimeForm(restSecond, `${styles.restTime} ${font.caption_300_12}`)}
              </div>
            </button>
          ) : (
            <button
              className={styles.restEndBtn}
              onClick={() => restHandler(__postRestEnd({ restEndPoint: date, studyStartPoint: date }))}
            >
              <Play className={styles.setting} fill={"var(--neutral-10)"} />
              <div>{changeTimeForm(restSecond, `${styles.savedRestTime} ${font.subtitle2_600_16}`)}</div>
            </button>
          )}
          <StopButton onClickHandler={endTimer} />
        </div>
      )}
    </div>
  );
};

export default ButtonBox;
