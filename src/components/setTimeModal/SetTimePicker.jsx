import React from 'react';
import TimePicker from './TimePicker';
import styles from '../../css/timePickerBox.module.css';

const SetTimePicker = ({ setTime, time }) => {
    const hour = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    //분, 초 array 생성
    const minute = new Array(60).fill().map((_, i) => {
        return i;
    });
    const second = new Array(60).fill().map((_, i) => {
        return i;
    });
    return (
        <div className={styles.timePickerBox}>
            <TimePicker mode={hour} time={time} setTime={setTime} unit='hour' />
            <TimePicker mode={minute} time={time} setTime={setTime} unit='minute' />
            <TimePicker mode={second} time={time} setTime={setTime} unit='second' />
        </div>
    );
};

export default SetTimePicker;
