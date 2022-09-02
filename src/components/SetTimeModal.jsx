import React, { useEffect, useRef, useState } from 'react';
import styles from'../css/setTimeModal.module.css';

const SetTimeModal = ({mode, setMode, second, minute, hour, setRunning}) => {

    const [target, setTarget] = useState({})
    const targetHour = useRef();
    const targetMinute = useRef();
    const targetSecond = useRef();

    useEffect(() => {
        if(target !== {} && target.hour === hour && target.minute === minute && target.second === second){
            alert('끝')
            setRunning(false)
        }
    }, [target, hour, minute, second, setRunning])

    return (
        <div className={styles.modal}>
            <input type="number" ref={targetHour} min='0' max='23' defaultValue='0'/>
            <input type="number" ref={targetMinute} min='0' max='59' defaultValue='0'/>
            <input type="number" ref={targetSecond} min='0' max='59' defaultValue='0'/>
            <button onClick={() => {
                setTarget({hour: Number(targetHour.current.value), minute: Number(targetMinute.current.value), second: Number(targetSecond.current.value)})
            }}>시간 설정</button>
        </div>
    );
};

export default SetTimeModal;