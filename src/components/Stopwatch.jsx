import React from 'react';
import { useState, useEffect } from 'react';
import SetTimeModal from './setTimeModal/SetTimeModal';
import styles from '../css/stopwatch.module.css';

const Stopwatch = () => {
    const date = new Date().getTime();
    const startTime = localStorage.getItem('startTime');
    const elapsedTime = Math.floor((date - startTime) / 1000);

    const [target, setTarget] = useState(0);
    const [mode, setMode] = useState('normal');
    const [running, setRunning] = useState(false);
    const [modal, setModal] = useState(false);

    const [second, setSecond] = useState(0);

    if (!running && startTime) {
        setRunning(true);
    }

    console.log(elapsedTime);

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setSecond((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    useEffect(() => {
        if (target !== 0 && target === second) {
            setRunning(false);
            setSecond(0);
            setTarget(0);
            localStorage.removeItem('startTime');
        }
    }, [second]);

    useEffect(() => {
        running && setSecond(elapsedTime);
    }, [running]);

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
                    elapsedTime={elapsedTime}
                />
            )}
            {modal && <div style={{ backgroundColor: 'black' }}>hi</div>}
        </div>
    );
};

export default Stopwatch;
