import React from "react";
import styles from "./setTimeModal.module.css";
import SetTimePicker from "./SetTimePicker";
import { ReactComponent as Close } from "../../common/svg/close.svg";
import font from "../../common/css/font.module.css";

const SetWatchModal = ({
    startTime,
    savedStudyTime,
    currentDate,
    remainTime,
    changeTimeForm,
    stop,
    setMode,
    setStop,
    running,
    setRunning,
    time,
    setTime,
    setColor,
    mode,
}) => {
    console.log(mode, remainTime);
    return (
        <div className={localStorage.targetTime > 0 ? styles.setModal : styles.modal}>
            <div className={`${styles.title} ${font.subtitle2_600_16}`}>
                <div>{mode === "complete" ? "타이머 종료" : "타이머"}</div>
                <Close
                    className={styles.close}
                    onClick={() => {
                        setMode("normal");
                        setColor("#7E7C8C");
                    }}
                />
            </div>
            {!running ? (
                <>
                    <SetTimePicker setTime={setTime} time={time} />
                    <button
                        className={`${styles.startBtn} ${font.subtitle2_600_16}`}
                        onClick={() => {
                            localStorage.setItem("targetTime", (Number(time.hour) * 3600 + Number(time.minute) * 60) * 1000);
                            setMode("normal");
                            setRunning(true);
                        }}>
                        시작하기
                    </button>
                </>
            ) : (
                <>
                    {changeTimeForm(remainTime, styles.remainTime)}
                    <div className={styles.buttonBox}>
                        {mode === "complete" ? (
                            <button className={`${styles.completeButton} ${font.subtitle2_600_16}`} onClick={() => {}}>
                                확인
                            </button>
                        ) : !stop ? (
                            <>
                                <button
                                    className={`${styles.stopButton} ${font.subtitle2_600_16}`}
                                    onClick={() => {
                                        setStop(true);
                                        localStorage.setItem("savedStudyTime", savedStudyTime + currentDate - startTime);
                                        localStorage.setItem("restStart", true);
                                    }}>
                                    멈추기
                                </button>
                                <button
                                    className={`${styles.endButton} ${font.subtitle2_600_16}`}
                                    onClick={() => {
                                        setRunning(false);
                                        setStop(false);
                                        setTime({ hour: 0, minute: 0, second: 0 });
                                        localStorage.removeItem("startTime");
                                        localStorage.removeItem("targetTime");
                                        localStorage.removeItem("savedStudyTime");
                                        localStorage.removeItem("restStart");
                                        setMode("normal");
                                        setColor("#7E7C8C");
                                    }}>
                                    종료하기
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className={`${styles.stopButton} ${font.subtitle2_600_16}`}
                                    onClick={() => {
                                        setStop(false);
                                        localStorage.removeItem("restStart");
                                    }}>
                                    계속하기
                                </button>
                                <button
                                    className={`${styles.endButton} ${font.subtitle2_600_16}`}
                                    onClick={() => {
                                        setRunning(false);
                                        setStop(false);
                                        setTime({ hour: 0, minute: 0, second: 0 });
                                        localStorage.removeItem("startTime");
                                        localStorage.removeItem("targetTime");
                                        localStorage.removeItem("savedStudyTime");
                                        localStorage.removeItem("restStart");
                                        setMode("normal");
                                        setColor("#7E7C8C");
                                    }}>
                                    종료하기
                                </button>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default SetWatchModal;
