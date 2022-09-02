import React, { useEffect, useRef, useState } from 'react';
import styles from'../css/setTimeModal.module.css';

const SetTimeModal = ({setMode, second, minute, hour, setRunning}) => {

    const [target, setTarget] = useState({})
    const targetHour = useRef();
    const targetMinute = useRef();
    const targetSecond = useRef();

    if(target !== {} && target.hour === hour && target.minute === minute && target.second === second){
        setRunning(false)
        alert('끝')
    }

    return (
        <div className={styles.modal}>
            <input type="number" ref={targetHour} min='0' max='23'/>
            <input type="number" ref={targetMinute} min='0' max='59'/>
            <input type="number" ref={targetSecond} min='0' max='59'/>
            <button onClick={() => {
                setTarget({...target, hour: Number(targetHour.current.value), minute: Number(targetMinute.current.value), second: Number(targetSecond.current.value)})
                // setMode('normal')
            }}>시간 설정</button>
        </div>
    );
};

export default SetTimeModal;