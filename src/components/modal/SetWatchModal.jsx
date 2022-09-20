import React from 'react';
import styles from './setTimeModal.module.css';
import SetTimePicker from './SetTimePicker';
import { ReactComponent as Close } from '../../common/svg/close.svg';

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
}) => {
    return (
        <div className={localStorage.targetTime > 0 ? styles.setModal : styles.modal}>
            <div className={styles.title}>
                <div>목표 공부시간 설정</div>
                <Close
                    className={styles.close}
                    onClick={() => {
                        setMode('normal');
                    }}
                />
            </div>
            {!running ? (
                <>
                    <SetTimePicker setTime={setTime} time={time} />
                    <button
                        className={styles.startBtn}
                        onClick={() => {
                            localStorage.setItem('targetTime', (Number(time.hour) * 3600 + Number(time.minute) * 60) * 1000);
                            setMode('normal');
                            setRunning(true);
                        }}>
                        시작하기
                    </button>
                </>
            ) : (
                <>
                    {changeTimeForm(remainTime, styles.remainTime)}
                    <div className={styles.buttonBox}>
                        {!stop ? (
                            <button
                                className={styles.stopButton}
                                onClick={() => {
                                    setStop(true);
                                    // 멈추기 하면 현재 시간 - 시작 시간 저장
                                    // 그러니까 stop 이 false 일 때에는 시간을 현재 시간 - 시작시간으로 하고
                                    // stop이 true일 때는 savedStudyTime으로 하면 됨.
                                    console.log(currentDate, startTime);
                                    localStorage.setItem('savedStudyTime', savedStudyTime + currentDate - startTime);
                                    localStorage.setItem('restStart', true);
                                }}>
                                멈추기
                            </button>
                        ) : (
                            <button
                                className={styles.stopButton}
                                onClick={() => {
                                    setStop(false);
                                    localStorage.removeItem('restStart');
                                }}>
                                계속하기
                            </button>
                        )}
                        <button
                            className={styles.endButton}
                            onClick={() => {
                                setRunning(false);
                                setStop(false);
                                setTime({ hour: 0, minute: 0, second: 0 });
                                localStorage.removeItem('startTime');
                                localStorage.removeItem('targetTime');
                                localStorage.removeItem('savedStudyTime');
                                localStorage.removeItem('restStart');
                                setMode('normal');
                            }}>
                            종료하기
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default SetWatchModal;
