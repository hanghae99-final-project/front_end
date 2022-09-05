import React, { useState } from 'react';
import styles from '../../css/setTimeModal.module.css';
import SetTime from './SetTime';

const SetTimeModal = ({ target, setTarget, setMode, setRunning, second, running, setSecond }) => {
    const [time, setTime] = useState({ hour: 0, minute: 0, second: 0 });
    console.log(target);
    const date = new Date().getTime();

    return (
        <div className={styles.modal}>
            {running ? (
                <div className={styles.time}>
                    <span>{parseInt(second / 3600) < 10 ? `0${parseInt(second / 3600)}` : `${parseInt(second / 3600)}`}:</span>
                    <span>
                        {parseInt((second % 3600) / 60) < 10 ? `0${parseInt((second % 3600) / 60)}` : `${parseInt((second % 3600) / 60)}`}:
                    </span>
                    <span>{second % 60 < 10 ? `0${second % 60}` : `${second % 60}`}</span>
                    <button
                        onClick={() => {
                            localStorage.removeItem('startTime');
                            setRunning(false);
                            setTarget(0);
                            setSecond(0);
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
                            localStorage.setItem('startTime', date);
                            setTarget(Number(time.hour) * 3600 + Number(time.minute) * 60 + Number(time.second));
                            setRunning(true);
                        }}>
                        시작하기
                    </button>
                </>
            )}
        </div>
    );
};

export default SetTimeModal;
