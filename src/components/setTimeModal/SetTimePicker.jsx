import React from 'react';
import TimePicker from './TimePicker';
import styles from '../../css/timePickerBox.module.css';

const SetTimePicker = ({ setTime, time }) => {
    //시간 array 생성
    const hour = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    const minute = new Array(60).fill().map((_, i) => {
        return i;
    });
    return (
        <div className={styles.timePickerBox}>
            <TimePicker mode={hour} time={time} setTime={setTime} unit='hour' />
            <div>시간</div>
            <TimePicker mode={minute} time={time} setTime={setTime} unit='minute' />
            <div>분</div>
        </div>
    );
};

export default SetTimePicker;
