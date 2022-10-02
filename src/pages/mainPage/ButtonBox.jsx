import React from "react";
import styles from "../../components/timeTimer/timeTimer.module.css";
import font from "../../common/css/font.module.css";
import { useDispatch } from "react-redux";
import { changeColor } from "../../app/slice/layoutColorSlice";
import { __postRestStart, __postRestEnd } from "../../app/slice/timeTimerSlice";
import changeTimeForm from "../../utils/changeTimeForm";
import setting from "../../common/svg/setting_icon.svg";
import pause from "../../common/svg/pause_icon.svg";
import { ReactComponent as Play } from "../../common/svg/play_icon.svg";
import StopButton from "../../components/timeTimer/StopButton";

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
            className={second >= targetTime / 1000 ? styles.redBtn : styles.playBtn}
            onClick={() => {
              setRefresh(true);
              setRun(true);
              dispatch(changeColor(second >= targetTime / 1000 ? "red" : "green"));
            }}
          >
            <div className={styles.playBox}>
              <Play
                className={styles.setting}
                fill={second >= targetTime / 1000 ? "var(--neutral-100)" : "var(--neutral-10)"}
              />
            </div>
            <div
              className={`${second >= targetTime / 1000 ? styles.redText : styles.playText} ${font.subtitle2_600_16}`}
            >
              시작하기
            </div>
          </button>
        )
      ) : (
        <div className={styles.studingButtonBox}>
          {!rest ? (
            <>
              <button
                className={styles.restStartBtn}
                onClick={() => {
                  setRest(true);
                  setRefresh(false);
                  dispatch(changeColor("blue"));
                  dispatch(
                    __postRestStart({
                      restStartPoint: date,
                      studyEndPoint: date
                    })
                  );
                }}
              >
                <img src={pause} alt="휴식하기" />
                <div className={styles.restTextBox}>
                  <div className={`${styles.restText} ${font.subtitle2_600_16}`}>휴식하기</div>
                  {changeTimeForm(restSecond, `${styles.restTime} ${font.caption_300_12}`)}
                </div>
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.restEndBtn}
                onClick={() => {
                  setRest(false);
                  setRun(true);
                  dispatch(__postRestEnd({ restEndPoint: date, studyStartPoint: date }));
                }}
              >
                <Play className={styles.setting} fill={"var(--neutral-10)"} />
                <div>{changeTimeForm(restSecond, `${styles.savedRestTime} ${font.subtitle2_600_16}`)}</div>
              </button>
            </>
          )}
          <StopButton
            restStartPoint={restStartPoint}
            date={date}
            setRefresh={setRefresh}
            setRun={setRun}
            setRest={setRest}
          />
        </div>
      )}
    </div>
  );
};

export default ButtonBox;
