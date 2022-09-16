import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MyPageStudyTime = () => {
    const dispatch = useDispatch();
    const studyStartPoint = useSelector((state) => state.timer?.studyStartPoint);
    const savedStudyTime = useSelector((state) => state.timer?.savedStudyTime);
    const restStartPoint = useSelector((state) => state.timer?.restStartPoint);
    const savedRestTime = useSelector((state) => state.timer?.savedRestTime);
    return <div></div>;
};

export default MyPageStudyTime;
