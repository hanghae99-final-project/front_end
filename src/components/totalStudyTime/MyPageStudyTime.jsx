import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import changeTimeSimpleForm from '../../utils/changeTimeSimpleForm';
import changeTimeForm from '../../utils/changeTimeForm';
import styles from '../../pages/css/mypage.module.css';
import axios from 'axios';
import { get_studytime } from '../../app/slice/timeTimerSlice';

const MyPageStudyTime = () => {
    // const color = useSelector((state) => state.color);
    const date = new Date().getTime();
    const dispatch = useDispatch();
    const [totalStudyTime, setTotalStudyTime] = useState(0);
    const [run, setRun] = useState(false); // 타임타이머 동작 여부
    const [second, setSecond] = useState(0); // just '초'
    const studyStartPoint = useSelector((state) => state.timer?.studyStartPoint);
    const savedStudyTime = useSelector((state) => state.timer?.savedStudyTime);
    const targetTime = useSelector((state) => state.timer?.targetTime);

    useEffect(() => {
        __getTotalStudyTime();
    }, []);

    useEffect(() => {
        if (targetTime === 0) {
            dispatch(get_studytime());
        }
    }, [dispatch]);

    const __getTotalStudyTime = async () => {
        const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + `/mypage/getTotalStudyTime`, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        });
        setTotalStudyTime(Math.floor(data.totalStudyTime / 1000));
    };

    useEffect(() => {
        let interval;
        if (run) {
            interval = setInterval(() => {
                setSecond((prev) => prev + 1);
            }, 1000);
        } else if (!run) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [run]);

    useEffect(() => {
        if (studyStartPoint === 0) {
            setSecond(Math.floor(savedStudyTime / 1000));
        } else {
            setSecond(Math.floor((savedStudyTime + date - studyStartPoint) / 1000));
            setRun(true);
        }
    }, [savedStudyTime, studyStartPoint]);

    return (
        <div className={styles.container}>
            <div className={styles.aboveArea}>
                <div className={styles.title}>오늘 공부시간</div>
                {changeTimeForm(second, styles.todayStudyTime)}
                <div className={styles.text}>누적 공부시간은 {changeTimeSimpleForm(totalStudyTime, styles.totalTime)}이에요</div>
            </div>
        </div>
    );
};

export default MyPageStudyTime;
