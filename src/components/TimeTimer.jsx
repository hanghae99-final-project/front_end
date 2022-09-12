import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_studytime, __postStudyStart, __postStudyEnd, __postRestStart, __postRestEnd } from '../app/slice/timeTimerSlice';
import SetTimeModal from './setTimeModal/SetTimeModal';
import styles from '../css/timeTimer.module.css';

const TimeTimer = () => {
    const date = new Date().getTime();
    const dispatch = useDispatch();

    const studyStartPoint = useSelector((state) => state.timer?.studyStartPoint);
    const savedStudyTime = useSelector((state) => state.timer?.savedStudyTime);
    const restStartPoint = useSelector((state) => state.timer?.restStartPoint);
    const savedRestTime = useSelector((state) => state.timer?.savedRestTime);
    const targetTime = useSelector((state) => state.timer?.targetTime);
    const yesterdayStudyTime = useSelector((state) => state.timer?.yesterdayStudyTime);

    const [mode, setMode] = useState('normal');
    const [refresh, setRefresh] = useState(false);
    const [target, setTarget] = useState({ hour: 3, minute: 0 }); //
    const [targetToSec, setTargetToSec] = useState(); // 설정시간을 초로 나타냄
    const [status, setStatus] = useState(yesterdayStudyTime || 0); // 어제 얼마나 공부했는지/ 현재 남은시간은 몇시간인지 상태를 나타냄

    const [rest, setRest] = useState(false); // 휴식 관리
    const [run, setRun] = useState(false); // 타임타이머 동작 여부
    const [second, setSecond] = useState(0); // just '초'
    const [restSecond, setRestSecond] = useState(0);

    const sec = second * (283 / targetToSec); // 타임타이머 동작을 위한 초 설정
    const remainSec = targetToSec - parseInt(second); // setStatus 작동을 위한 두번째 시간과 분

    const remainHour = parseInt(remainSec / 3600);
    const remainMinutes = parseInt((remainSec % 3600) / 60);

    useEffect(() => {
        dispatch(get_studytime());
    }, [dispatch]);

    /** 공부 시작 버튼 클릭 시 1초에 한 번씩 second를 업데이트 하도록 설정 */
    useEffect(() => {
        let interval;
        if (run && !rest) {
            interval = setInterval(() => {
                setSecond((prev) => prev + 1);
            }, 1000);
        } else if (!run || rest) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [run, rest]);

    /** 휴식 시작 버튼 클릭 시 1초에 한 번씩 restSecond를 업데이트 하도록 설정 */
    useEffect(() => {
        let interval;
        if (rest) {
            interval = setInterval(() => {
                setRestSecond((prev) => prev + 1);
            }, 1000);
        } else if (!rest || !run) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [run, rest]);

    useEffect(() => {
        if (!isNaN(targetToSec)) {
            setTargetToSec(target.hour * 3600 + target.minute * 60);
        } else {
            setTargetToSec(1);
        }
    }, [target, run]);

    useEffect(() => {
        !isNaN(remainHour) && !isNaN(remainMinutes)
            ? second >= targetTime / 1000
                ? setStatus('목표를 달성했어요 !')
                : setStatus(`${remainHour}시간 ${remainMinutes}분 남았어요!`)
            : setStatus(`어제 2시간 10분 공부했어요`);
        if (target !== {} && targetToSec === second) {
            alert('목표시간 도달');
            setRun(false);
            setStatus('목표량을 다 채웠어요!');
        }
    }, [target, second]);

    /**
     *  공부 중일 때, 혹은 공부 중이 아닐 때 공부 시간 설정
     *  저장된 시간(0 또는 공부한 시간) + ( 현재 시간 - (다시) 시작한 시간 )
     * */
    useEffect(() => {
        if (studyStartPoint === 0) {
            setSecond(Math.floor(savedStudyTime / 1000));
        } else {
            setSecond(Math.floor((savedStudyTime + date - studyStartPoint) / 1000));
            setRun(true);
        }
        setTargetToSec(targetTime / 1000);
    }, [savedStudyTime, studyStartPoint]);

    /** 휴식 중일 때, 혹은 휴식 중이 아닐 때 휴식 시간 설정 */
    useEffect(() => {
        if (restStartPoint !== 0) {
            setRestSecond(Math.floor((savedRestTime + date - restStartPoint) / 1000));
        } else {
            setRestSecond(Math.floor(savedRestTime / 1000));
        }
    }, [savedRestTime, restStartPoint, date]);

    /** 휴식 중일 때 새로고침 시 자동으로 휴식이 진행되게 설정 */
    useEffect(() => {
        if (restStartPoint !== 0) {
            setRun(false);
            setRest(true);
        }
    }, [restStartPoint]);

    /**
     * 공부를 시작하기 전에 렌더링이 진행되지 않아서
     * mount 되었을 때의 시간을 받아오는 것을 방지하기 위해
     * 시작 버튼을 클릭하면 state를 업데이트 시킨 후에 서버에 전송하도록 설정
     */
    useEffect(() => {
        if (refresh) {
            dispatch(__postStudyStart({ studyStartPoint: date }));
        }
    }, [refresh]);

    /**
     * second를 넣으면 00:00:00 형태로 변환시켜 주는 함수
     * @param {number} second
     * @returns 00:00:00
     */
    const changeTimeForm = (second) => {
        const hour = parseInt(second / 3600);
        const minutes = parseInt((second % 3600) / 60);
        const seconds = second % 60;
        return (
            <>
                <span>{hour < 10 ? `0${hour}` : `${hour}`}:</span>
                <span>{minutes < 10 ? `0${minutes}` : `${minutes}`}:</span>
                <span>{seconds < 10 ? `0${seconds}` : `${seconds}`}</span>
            </>
        );
    };

    return (
        <div className={styles.layout}>
            <div className={styles.baseTimer}>
                <div className={styles.a}>
                    <svg className={styles.baseSvg} viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
                        <g className={styles.baseTimerCircle}>
                            <circle className={styles.basePath} cx='50' cy='50' r='45' />
                            <path
                                strokeDasharray={`${sec} 283`}
                                className={styles.pathRemaining}
                                d='
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        '></path>
                        </g>
                    </svg>
                    <div className={styles.b}>
                        <span className={styles.timerLabel}>
                            {!run ? (
                                <div className={styles.targetTime}>
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
                                    <br />
                                </div>
                            ) : (
                                <div className={styles.targetTime}>
                                    {changeTimeForm(targetToSec)}
                                    <br />
                                </div>
                            )}
                            {changeTimeForm(second)}
                            <div className={styles.status}>{status}</div>
                        </span>
                    </div>
                </div>
            </div>

            {!run && !rest ? (
                <button
                    onClick={() => {
                        setRefresh(true);
                        setRun(true);
                    }}>
                    시작하기
                </button>
            ) : (
                <>
                    {!rest ? (
                        <>
                            <button
                                onClick={() => {
                                    setRest(true);
                                    setRefresh(false);
                                    dispatch(__postRestStart({ restStartPoint: date, studyEndPoint: date }));
                                }}>
                                휴식하기
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    setRest(false);
                                    dispatch(__postRestEnd({ restEndPoint: date, studyStartPoint: date }));
                                }}>
                                계속하기
                            </button>
                        </>
                    )}
                    {changeTimeForm(restSecond)}
                    <button
                        onClick={() => {
                            setRefresh(false);
                            setRun(false);
                            setRest(false);
                            dispatch(__postStudyEnd(restStartPoint !== 0 ? { restEndPoint: date } : { studyEndPoint: date }));
                        }}>
                        종료하기
                    </button>
                </>
            )}
            {mode === 'set' && <SetTimeModal setTarget={setTargetToSec} time={target} setTime={setTarget} setMode={setMode} />}
        </div>
    );
};

export default TimeTimer;
