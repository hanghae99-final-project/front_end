import React from 'react';
import styles from '../../css/setTimeModal.module.css';
import SetTimePicker from './SetTimePicker';

const SetWatchModal = ({ changeTimeForm, stop, setMode, setSecond, setStop, second, running, setRunning, time, setTime, setTarget }) => {
    return (
        <div className={styles.modal}>
            {!running ? (
                <>
                    <SetTimePicker setTime={setTime} time={time} />
                    <button
                        className={styles.startBtn}
                        onClick={() => {
                            setTarget(Number(time.hour) * 3600 + Number(time.minute) * 60 + Number(time.second));
                            setMode('normal');
                            setRunning(true);
                        }}>
                        시작하기
                    </button>
                </>
            ) : (
                <>
                    {changeTimeForm(second)}
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
