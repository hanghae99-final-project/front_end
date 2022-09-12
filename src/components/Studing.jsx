import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_studing } from '../app/slice/mainSlice';
import styles from '../css/studing.module.css';
import '../css/color.css';

const Studing = () => {
    const dispatch = useDispatch();
    const studing = useSelector((state) => state.main.studing?.studing);
    useEffect(() => {
        dispatch(get_studing());
    }, [dispatch]);
    console.log(studing);
    return (
        <div className={styles.studing}>
            <div className={styles.online}></div>
            {studing}
        </div>
    );
};

export default Studing;
