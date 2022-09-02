import React from 'react';
import { useState , useEffect } from 'react';
import SetTimeModal from './SetTimeModal';

const Stopwatch = () => {

    const [target, setTarget] = useState({});
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [mode, setMode] = useState('normal');
    const [running, setRunning] = useState(false);
    
    useEffect(() => {
        let interval;
        if(running){
            interval = setInterval(() => {
                setSecond(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    },[running]);

    useEffect(() => {
        if(second === 60){
            setSecond(0);
            setMinute(prev => prev + 1);
        } else if (minute === 60) {
            setMinute(0);
            setHour(prev => prev + 1);
        }
    },[hour, minute, second]);

    useEffect(() => {
        if(target !== {} && target.hour === hour && target.minute === minute && target.second === second){
            alert('끝');
            setRunning(false);
        }
    }, [target, hour, minute, second, setRunning]);


    return (
        <div>
            <span>{`${hour} : ${minute} : ${second}`}</span>
            {
                mode === 'normal' ? 
                <button onClick={() => {
                    setMode('set');
                }}>시간 설정</button>
                :
                <button onClick={() => {
                    setMode('normal');
                }}>닫기</button>
            }
            <button onClick={() => {
                setRunning(true);
            }}>스톱워치 시작</button>
            <button onClick={() => {
                setRunning(false);
            }}>스톱워치 멈춰</button>
            {mode === 'set' && <SetTimeModal setMode={setMode} setTarget={setTarget}/>}
        </div>
    );
};

export default Stopwatch;