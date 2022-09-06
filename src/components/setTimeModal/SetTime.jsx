import React from 'react';
import styles from '../../css/setTimeModal.module.css';

const SetTime = ({ setTime, time }) => {
    return (
        <div>
            <div className={styles.time}>
                {/* Hour */}
                <input
                    type='number'
                    onChange={(e) => {
                        setTime({ ...time, hour: e.target.value });
                    }}
                    min='0'
                    max='23'
                    defaultValue='0'
                />
                {/* Minutes */}
                <input
                    type='number'
                    onChange={(e) => {
                        setTime({ ...time, minute: e.target.value });
                    }}
                    min='0'
                    max='59'
                    defaultValue='0'
                />
                {/* Seconds */}
                <input
                    type='number'
                    onChange={(e) => {
                        setTime({ ...time, second: e.target.value });
                    }}
                    min='0'
                    max='59'
                    defaultValue='0'
                />
            </div>
        </div>
    );
};

export default SetTime;
