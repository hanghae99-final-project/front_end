import React from 'react';
import { useState, useEffect } from 'react';
import SetTimeModal from './setTimeModal/SetTimeModal';
import styles from '../css/stopwatch.module.css';

const Stopwatch = () => {
    const [target, setTarget] = useState(0);
    const [time, setTime] = useState({ hour: 0, minute: 0, second: 0 });
    const [mode, setMode] = useState('normal');
    const [running, setRunning] = useState(false);
    const [stop, setStop] = useState(false);

    /** 시간 설정 */
    const [second, setSecond] = useState(localStorage.getItem('time') || 0);

    /** 시간 변수 선언 */
    const hour = parseInt(second / 3600);
    const minutes = parseInt((second % 3600) / 60);
    const seconds = second % 60;

    /** 로컬에 있는 time값 불러오기 */
    const startTime = localStorage.getItem('time');

    /** reload 시 time이 저장되어 있다면 자동 시작 */
    if (!running && startTime && startTime !== '0' && !stop) {
        setRunning(true);
    }

    /** 스톱워치 시간 증가 로직 */
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
        /** 5초마다 localStorage 업데이트 */
        if (second % 5 === 0) {
            localStorage.setItem('time', second);
        }
    }, [second]);

    return (
        <div className={styles.stopwatch}>
            <span>{hour < 10 ? `0${hour}` : `${hour}`}:</span>
            <span>{minutes < 10 ? `0${minutes}` : `${minutes}`}:</span>
            <span>{seconds < 10 ? `0${seconds}` : `${seconds}`}</span>
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
                    setTarget={setTarget}
                    setRunning={setRunning}
                    hour={hour}
                    minutes={minutes}
                    seconds={seconds}
                    setSecond={setSecond}
                    running={running}
                    time={time}
                    setTime={setTime}
                    setStop={setStop}
                />
            )}
        </div>
    );
};

export default Stopwatch;