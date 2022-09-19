import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getDday } from '../../app/slice/DdaySlice';
import styles from './dDay.module.css';

const Dday = () => {
    const dispatch = useDispatch();
    const dDay = useSelector((state) => state.dDay.myDday[0]);
    const today = new Date();
    const targetDay = new Date(dDay?.deadline);
    const remainDay = Math.floor((targetDay - today) / 1000 / 3600 / 24);

    useEffect(() => {
        dispatch(__getDday());
    }, []);

    return (
        <div className={styles.dayBox}>
            <span className={styles.day}>D-{remainDay}</span>
            <span className={styles.text}>{dDay?.content}</span>
        </div>
    );
};

export default Dday;
