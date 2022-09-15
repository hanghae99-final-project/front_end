import React from 'react';
import styles from '../../css/setTimeModal.module.css';
import SetTimePicker from './SetTimePicker';

const SetWatchModal = ({ remainTime, changeTimeForm, stop, setMode, setStop, running, setRunning, time, setTime }) => {
    return (
        <div className={styles.modal}>
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
                    {changeTimeForm(remainTime)}
                    <button
                        onClick={() => {
                            setRunning(false);
                            setTime({ hour: 0, minute: 0, second: 0 });
                            localStorage.removeItem('startTime');
                            localStorage.removeItem('targetTime');
                            localStorage.removeItem('restTime');
                            localStorage.removeItem('time');
                            setMode('normal');
                        }}>
                        끝내기
                    </button>
                    {!stop ? (
                        <button
                            onClick={() => {
                                setStop(true);
                                localStorage.setItem('restStart', true);
                            }}>
                            멈추기
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                localStorage.removeItem('restStart');
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
