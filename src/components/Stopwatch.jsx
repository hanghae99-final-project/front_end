import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import SetTimeModal from './SetTimeModal';

const Stopwatch = () => {

    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [hour, setHour] = useState(0);

    const [mode, setMode] = useState('normal');
    const [running, setRunning] = useState(false);
    
    useEffect(() => {
        let interval;
        if(running){
            interval = setInterval(() => {
                setSecond(prev => prev + 1)
            }, 1000);
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval);
    },[running]);

    useEffect(() => {
        if(second === 6){
            setSecond(0)
            setMinute(prev => prev + 1)
        } else if (minute === 3) {
            setMinute(0)
            setHour(prev => prev + 1)
        }
    },[hour, minute, second]);


    return (
        <div>
            <span>{`${hour} : ${minute} : ${second}`}</span>
            <button onClick={() => {
                setMode('set')
            }}>시간 설정</button>
            <button onClick={() => {
                setRunning(true)
            }}>스톱워치 시작</button>
            <button onClick={() => {
                setRunning(false)
            }}>스톱워치 멈춰</button>
            {mode === 'set' ? <SetTimeModal setMode={setMode} second={second} minute={minute} hour={hour} setRunning={setRunning}/> : null}
        </div>
    );
};

export default Stopwatch;