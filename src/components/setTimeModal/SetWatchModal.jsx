import React from 'react';
import styles from '../../css/setTimeModal.module.css';
import SetTimePicker from './SetTimePicker';
import { ReactComponent as Close } from '../../svg/close.svg';

const SetWatchModal = ({ remainTime, changeTimeForm, stop, setMode, setStop, running, setRunning, time, setTime }) => {
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
                                    localStorage.setItem('restStart', true);
                                }}>
                                멈추기
                            </button>
                        ) : (
                            <button
                                className={styles.stopButton}
                                onClick={() => {
                                    localStorage.removeItem('restStart');
                                    setStop(false);
                                }}>
                                계속하기
                            </button>
                        )}
                        <button
                            className={styles.endButton}
                            onClick={() => {
                                setRunning(false);
                                setTime({ hour: 0, minute: 0, second: 0 });
                                localStorage.removeItem('startTime');
                                localStorage.removeItem('targetTime');
                                localStorage.removeItem('restTime');
                                localStorage.removeItem('time');
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
