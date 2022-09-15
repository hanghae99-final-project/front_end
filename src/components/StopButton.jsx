import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { __postStudyEnd } from '../app/slice/timeTimerSlice';
import stop from '../image/stop_icon.svg';
import '../css/color.css';

const StopButton = ({ restStartPoint, date, type, setRefresh, setRun, setRest }) => {
    const dispatch = useDispatch();
    return (
        <>
            <StopBtn
                onClick={() => {
                    setRefresh(false);
                    setRun(false);
                    setRest(false);
                    dispatch(__postStudyEnd(restStartPoint !== 0 ? { restEndPoint: date } : { studyEndPoint: date }));
                }}>
                <img src={stop} alt='그만하기' />
                <div>그만하기</div>
            </StopBtn>
        </>
    );
};

export default StopButton;

const StopBtn = styled.button`
    width: 10rem;
    height: 3.75rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 3.438rem 1rem 1rem 0.5rem;
    padding: 0.75rem 1rem 0.75rem 0.5rem;
    border-radius: 8px;
    background-color: var(--neutral-10);
    div {
        width: 3.5rem;
        height: 1.5rem;
        flex-grow: 0;
        font-size: 1rem;
        font-weight: 600;
        line-height: 1.5;
        text-align: center;
        color: var(--neutral-100);
    }
`;
