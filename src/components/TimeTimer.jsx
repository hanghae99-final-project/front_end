import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_studytime, __postStudyStart, __postStudyEnd } from '../app/slice/timeTimerSlice';
import SetTimeModal from './setTimeModal/SetTimeModal';
import styles from '../css/timeTimer.module.css';

const TimeTimer = () => {
    const date = new Date().getTime();
    const [refresh, setRefresh] = useState(false);
    const dispatch = useDispatch();
    const userr = useSelector((state) => state.timer);
    const studyStartPoint = useSelector((state) => state.timer?.studyStartPoint);
    const savedStudyTime = useSelector((state) => state.timer?.savedStudyTime);
    const restStartPoint = useSelector((state) => state.timer?.restStartPoint);
    const savedRestTime = useSelector((state) => state.timer?.savedRestTime);
    const targetTime = useSelector((state) => state.timer?.targetTime);
    const yesterdayStudyTime = useSelector((state) => state.timer?.yesterdayStudyTime);

    const myStudyTime = Math.floor((savedStudyTime + date - studyStartPoint) / 1000);
    const [targetToSec, setTargetToSec] = useState(); // 설정시간을 초로 나타냄
    const [status, setStatus] = useState(yesterdayStudyTime || 0); // 어제 얼마나 공부했는지/ 현재 남은시간은 몇시간인지 상태를 나타냄
    const [run, setRun] = useState(false); // 타임타이머 동작 여부
    const [rest, setRest] = useState(false); // 휴식 관리
    const [target, setTarget] = useState({ hour: 0, minute: 0 }); //
    const [mode, setMode] = useState('normal');
    const [second, setSecond] = useState(0); // just '초'
    const sec = second * (283 / targetToSec); // 타임타이머 동작을 위한 초 설정
    const remainSec = targetToSec - parseInt(second); // setStatus 작동을 위한 두번째 시간과 분

    // 저장된 시간(0 또는 공부한 시간) + ( 현재 시간 - (다시) 시작한 시간 )
    // useEffect(() => {
    //     if (myStudyTime >= 0) {
    //         setSecond(myStudyTime);
    //     } else {
    //         setSecond(0);
    //     }
    // }, [myStudyTime]);

    const hour = parseInt(second / 3600);
    const minutes = parseInt((second % 3600) / 60);
    const seconds = second % 60;

    const hour2 = parseInt(remainSec / 3600);
    const minutes2 = parseInt((remainSec % 3600) / 60);

    useEffect(() => {
        dispatch(get_studytime());
    }, []);

    useEffect(() => {
        console.log(userr);
    }, [userr]);

    // console.log(get_time.savedStudyTime);

    /**1초에 한 번씩 더하는 것 */
    useEffect(() => {
        let interval;
        if (run && !rest) {
            interval = setInterval(() => {
                setSecond((prev) => prev + 1);
            }, 1000);
        } else if (!run && rest) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [run, rest]);

    /**  */
    useEffect(() => {
        if (!isNaN(targetToSec)) {
            setTargetToSec(target.hour * 3600 + target.minute * 60);
        } else {
            // 무슨의미죠?
            setTargetToSec(1);
        }
    }, [target, run]);

    useEffect(() => {
        !isNaN(hour2) && !isNaN(minutes2) ? setStatus(`${hour2}시간 ${minutes2}분 남았어요!`) : setStatus(`어제 2시간 10분 공부했어요`);
        if (target !== {} && targetToSec === second) {
            alert('목표시간 도달');
            setRun(false);
            setStatus('목표량을 다 채웠어요!');
        }
    }, [target, second]);

    useEffect(() => {
        if (refresh) {
            dispatch(__postStudyStart({ studyStartPoint: date }));
        }
    }, [refresh]);

    return (
        <div className={styles.layout}>
            <p>timer</p>

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
                                    <span>{target.hour < 10 ? '0' + target.hour : target.hour}:</span>
                                    <span>{target.minute < 10 ? '0' + target.minute : target.minute}:</span>
                                    <span>00</span>
                                    <br />
                                </div>
                            )}

                            <span>{hour < 10 ? `0${hour}` : `${hour}`}:</span>
                            <span>{minutes < 10 ? `0${minutes}` : `${minutes}`}:</span>
                            <span>{seconds < 10 ? `0${seconds}` : `${seconds}`}</span>
                            <div className={styles.status}>{status}</div>
                        </span>
                    </div>
                </div>
            </div>

            {!run ? (
                <button
                    onClick={() => {
                        setRefresh(true);
                        console.log(date);
                        setRun(true);
                    }}>
                    시작하기
                </button>
            ) : (
                <>
                    {!rest ? (
                        <button
                            onClick={() => {
                                setRest(true);
                            }}>
                            휴식하기
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setRest(false);
                            }}>
                            계속하기
                        </button>
                    )}
                    <button
                        onClick={() => {
                            setRun(false);
                            console.log(date - studyStartPoint);
                            dispatch(__postStudyEnd({ studyEndPoint: date }));
                        }}>
                        종료하기
                    </button>
                </>
            )}
            {mode === 'set' && (
                <SetTimeModal
                    //초로 변환
                    setTarget={setTargetToSec}
                    //몇시 몇분
                    time={target}
                    setTime={setTarget}
                    setMode={setMode}
                />
            )}
        </div>
    );
};

export default TimeTimer;
