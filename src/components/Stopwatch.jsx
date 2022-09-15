import React from 'react';
import { useState, useEffect } from 'react';
import SetWatchModal from './setTimeModal/SetWatchModal';
import styles from '../css/stopwatch.module.css';
import clock from '../image/check_icon.svg';
import changeTimeForm from './changeTimeForm';

const Stopwatch = () => {
    /** 현재시간 및 시작 시간 */
    const currentDate = new Date().getTime();

    /** 로컬에 있는 time값 불러오기 */
    const startTime = Number(localStorage.getItem('startTime'));
    const targetTime = Number(localStorage.getItem('targetTime'));
    const restTime = Number(localStorage.getItem('restTime')); // 존재하지 않으면 0

    const [time, setTime] = useState({ hour: 0, minute: 0, second: 0 });
    const [mode, setMode] = useState('normal');
    const [running, setRunning] = useState(false);
    const [stop, setStop] = useState(false);
    /** 시간 설정 */
    const [second, setSecond] = useState(0);
    const [restSecond, setRestSecond] = useState(restTime);

    /** 남은 시간 */
    const remainTime =
        targetTime === 0 ? 0 : Math.floor((targetTime - (startTime === 0 ? 1 : currentDate - startTime)) / 1000) + restSecond;

    /** reload 시 time이 저장되어 있다면 자동 시작 */
    if (!running && startTime && startTime !== 0 && !stop && !localStorage.restStart) {
        setRunning(true);
    }

    if (!running && startTime && startTime !== 0 && !stop && localStorage.restStart) {
        setRunning(true);
        setStop(true);
    }

    /** 스톱워치 시간 증가 로직 */
    useEffect(() => {
        let interval;
        if (running && !stop) {
            interval = setInterval(() => {
                setSecond((prev) => prev + 1);
            }, 1000);
        } else if (!running || stop) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running, stop]);

    /** 휴식시간 증가 로직 */
    useEffect(() => {
        let interval;
        if (stop) {
            interval = setInterval(() => {
                setRestSecond((prev) => prev + 1);
            }, 1000);
        } else if (!stop) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [stop]);

    /** running이 바뀌었을 때true이고,  startTime을 local에 저장 */
    useEffect(() => {
        if (running && !localStorage.startTime) {
            localStorage.setItem('startTime', currentDate);
        }
    }, [running]);

    /** 목표시간 달성 시 멈추고 시간 초기화 */
    useEffect(() => {
        if (currentDate >= startTime + targetTime - restTime) {
            setRunning(false);
            localStorage.removeItem('startTime');
            localStorage.removeItem('targetTime');
            localStorage.removeItem('restTime');
            localStorage.removeItem('time');
        }
    }, [second]);

    /** 휴식시간 1초에 한 번씩 저장 */
    useEffect(() => {
        localStorage.setItem('restTime', restSecond);
    }, [restSecond]);

    return (
        <div className={styles.stopwatch}>
            {running && <div className={styles.remainTime}>{changeTimeForm(remainTime)}</div>}
            {mode === 'normal' ? (
                <img
                    className={styles.clock}
                    src={clock}
                    alt='스톱워치'
                    onClick={() => {
                        setMode('set');
                    }}
                />
            ) : (
                <button
                    onClick={() => {
                        setMode('normal');
                    }}>
                    닫기
                </button>
            )}
            {mode === 'set' && (
                <SetWatchModal
                    setRunning={setRunning}
                    changeTimeForm={changeTimeForm}
                    running={running}
                    time={time}
                    setTime={setTime}
                    setStop={setStop}
                    stop={stop}
                    setMode={setMode}
                    remainTime={remainTime}
                />
            )}
        </div>
    );
};

export default Stopwatch;
