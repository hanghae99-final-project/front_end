import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_studing } from '../../app/slice/mainSlice';
import styles from './studing.module.css';
import '../../common/css/color.css';
import font from '../../common/css/font.module.css';

const Studying = () => {
    const dispatch = useDispatch();
    const studying = useSelector((state) => state.main?.studing);
    useEffect(() => {
        dispatch(get_studing());
    }, [dispatch]);
    return (
        <div className={`${styles.studing} ${font.body2_300_14}`}>
            <div className={`${styles.online} ${font.body2_300_14}`}></div>
            {studying}
        </div>
    );
};

export default Studying;
