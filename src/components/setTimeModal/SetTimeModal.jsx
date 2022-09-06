import React from 'react';
import styles from '../../css/setTimeModal.module.css';
import SetTime from './SetTime';

const SetTimeModal = ({ target, setTarget, setRunning, second, running, setSecond, time, setTime, setStop }) => {
    console.log(target);

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
