import React from 'react';
import { useState, useEffect } from 'react';
import SetWatchModal from '../modal/SetWatchModal';
import styles from './stopwatch.module.css';
import { ReactComponent as Timer } from '../../common/svg/timer.svg';
import changeTimeForm from '../../utils/changeTimeForm';

const Stopwatch = ({ mode, setMode }) => {
    /** 현재시간 및 시작 시간 */
    const currentDate = new Date().getTime();

    /** 로컬에 있는 time값 불러오기 */
    const targetTime = Number(localStorage.getItem('targetTime'));
    const startTime = Number(localStorage.getItem('startTime'));
    const savedStudyTime = Number(localStorage.getItem('savedStudyTime'));

    const [time, setTime] = useState({ hour: 0, minute: 0, second: 0 });
    const [running, setRunning] = useState(false);
    const [stop, setStop] = useState(false);

    /**
     * 단순히 1초마다 렌더링 시키기 위한 state
     * 다른 것으로 바꿀 수 있을까?
     */
    const [second, setSecond] = useState(0);

    /** 남은 시간 */
    const remainTime =
        targetTime === 0
            ? 0
            : stop
            ? Math.floor((targetTime - savedStudyTime) / 1000)
            : Math.floor((targetTime - savedStudyTime - (startTime === 0 ? 1 : currentDate - startTime)) / 1000);

    /** reload 시 time이 저장되어 있고, 휴식 중이 아니라면 자동 시작 */
    if (!running && startTime > 0 && !stop && !localStorage.restStart) {
        setRunning(true);
    }

    /** reload 공부시간이 저장되어 있고, 휴식 중이라면 일시 정지 */
    if (!running && savedStudyTime > 0 && !stop && localStorage.restStart) {
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

    /** running이 바뀌었을 때, startTime을 local에 저장 */
    useEffect(() => {
        if (running && !stop && !localStorage.startTime) {
            localStorage.setItem('startTime', currentDate);
        }
    }, [running, stop]);

    /** stop했을 때,  startTime을 제거 */
    useEffect(() => {
        if (running && stop && localStorage.startTime) {
            localStorage.removeItem('startTime');
        }
    }, [stop]);

    return (
        <div className={styles.stopwatchBox}>
            <div className={styles.stopwatch}>
                {running && <div className={styles.remainTime}>{changeTimeForm(remainTime)}</div>}
                <Timer
                    className={styles.clock}
                    onClick={() => {
                        setMode('set');
                    }}
                />
            </div>
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
                    currentDate={currentDate}
                    startTime={startTime}
                    savedStudyTime={savedStudyTime}
                />
            )}
        </div>
    );
};
export default Stopwatch;
