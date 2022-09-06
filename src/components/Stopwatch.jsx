import React from 'react';
import { useState, useEffect } from 'react';
import SetTimeModal from './setTimeModal/SetTimeModal';
import styles from '../css/stopwatch.module.css';

const Stopwatch = () => {
    const startTime = localStorage.getItem('time');

    const [target, setTarget] = useState(0);
    const [time, setTime] = useState({ hour: 0, minute: 0, second: 0 });
    const [mode, setMode] = useState('normal');
    const [running, setRunning] = useState(false);
    const [modal, setModal] = useState(false);
    const [stop, setStop] = useState(false);

    //시간
    const [second, setSecond] = useState(localStorage.getItem('time') || 0);

    if (!running && startTime && !stop) {
        setRunning(true);
    }

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                //Number로 바꿔주지 않으면 string으로 판단해서 1, 11, 111 이렇게 증가함
                setSecond((prev) => Number(prev) + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    /** 목표 시간 달성하면 초기화 */
    useEffect(() => {
        if (target !== 0 && target === second) {
            setRunning(false);
            setSecond(0);
            setTarget(0);
            setTime({ hour: 0, minute: 0, second: 0 });
            localStorage.removeItem('startTime');
        }
    }, [second]);

    /** 5초마다 localStorage 업데이트 */
    useEffect(() => {
        if (second % 5 === 0) {
            localStorage.setItem('time', second);
        }
    }, [second]);

    return (
        <div className={styles.stopwatch}>
            <span>{parseInt(second / 3600) < 10 ? `0${parseInt(second / 3600)}` : `${parseInt(second / 3600)}`}:</span>
            <span>{parseInt((second % 3600) / 60) < 10 ? `0${parseInt((second % 3600) / 60)}` : `${parseInt((second % 3600) / 60)}`}:</span>
            <span>{second % 60 < 10 ? `0${second % 60}` : `${second % 60}`}</span>
            {mode === 'normal' ? (
                <button
                    onClick={() => {
                        setMode('set');
                    }}>
                    시간 설정
                </button>
            ) : (
                <button
                    onClick={() => {
                        setMode('normal');
                    }}>
                    닫기
                </button>
            )}
            {mode === 'set' && (
                <SetTimeModal
                    target={target}
                    setMode={setMode}
                    setTarget={setTarget}
                    setRunning={setRunning}
                    second={second}
                    setSecond={setSecond}
                    running={running}
                    time={time}
                    setTime={setTime}
                    setStop={setStop}
                />
            )}
            {modal && <div style={{ backgroundColor: 'black' }}>hi</div>}
        </div>
    );
};

export default Stopwatch;
