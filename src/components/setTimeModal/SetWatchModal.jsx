import React from 'react';
import styles from '../../css/setTimeModal.module.css';
import SetTimePicker from './SetTimePicker';

const SetWatchModal = ({ stop, setMode, setSecond, setStop, hour, minutes, seconds, running, setRunning, time, setTime, setTarget }) => {
    return (
        <div className={styles.modal}>
            {!running ? (
                <>
                    <SetTimePicker setTime={setTime} time={time} />
                    <button
                        className={styles.startBtn}
                        onClick={() => {
                            /** 시간을 초로 바꿈 */
                            setTarget(Number(time.hour) * 3600 + Number(time.minute) * 60 + Number(time.second));
                            setMode('normal');
                            setRunning(true);
                        }}>
                        시작하기
                    </button>
                </>
            ) : (
                <>
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
                            setMode('normal');
                        }}>
                        끝내기
                    </button>
                    {!stop ? (
                        <button
                            onClick={() => {
                                setStop(true);
                            }}>
                            멈추기
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setStop(false);
                            }}>
                            계속하기
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default SetWatchModal;
