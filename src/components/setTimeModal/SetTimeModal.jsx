import React from 'react';
import styles from '../../css/setTimeModal.module.css';
import SetTime from './SetTime';

const SetTimeModal = ({ setTarget, setRunning, hour, minutes, seconds, running, setSecond, time, setTime, setStop }) => {
    return (
        <div className={styles.modal}>
            {running ? (
                <div className={styles.time}>
                    <span>{hour < 10 ? `0${hour}` : `${hour}`}:</span>
                    <span>{minutes < 10 ? `0${minutes}` : `${minutes}`}:</span>
                    <span>{seconds < 10 ? `0${seconds}` : `${seconds}`}</span>
                    <button
                        onClick={() => {
                            localStorage.removeItem('time');
                            setRunning(false);
                            setTarget(0);
                            setSecond(0);
                            setTime({ hour: 0, minute: 0, second: 0 });
                        }}>
                        종료하기
                    </button>
                </div>
            ) : (
                <>
                    <SetTime setTime={setTime} time={time} />
                    <button
                        className={styles.startBtn}
                        onClick={() => {
                            setTarget(Number(time.hour) * 3600 + Number(time.minute) * 60 + Number(time.second));
                            setRunning(true);
                        }}>
                        시작하기
                    </button>
                </>
            )}
            {running ? (
                <>
                    <button
                        onClick={() => {
                            setRunning(false);
                            setStop(true);
                        }}>
                        멈추기
                    </button>
                </>
            ) : (
                <>
                    <button
                        onClick={() => {
                            setRunning(true);
                            setStop(false);
                        }}>
                        계속하기
                    </button>
                </>
            )}
        </div>
    );
};

export default SetTimeModal;
