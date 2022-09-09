import React from 'react';
import styles from '../../css/setTimeModal.module.css';
import SetTimePicker from './SetTimePicker';

const SetTimeModal = ({ time, setTime, setMode }) => {
    return (
        <div className={styles.modal}>
            <SetTimePicker setTime={setTime} time={time} />
            <button
                className={styles.startBtn}
                onClick={() => {
                    setMode('normal');
                }}>
                설정하기
            </button>
        </div>
    );
};

export default SetTimeModal;
