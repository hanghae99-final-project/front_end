import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_studing } from '../app/slice/mainSlice';

const Studing = () => {
    const dispatch = useDispatch();
    const studing = useSelector((state) => state.main.studing?.studing);
    useEffect(() => {
        dispatch(get_studing());
    }, [dispatch]);
    return <div>지금 공부하고있는 사람들은 총 {studing}명이에요</div>;
};

export default Studing;
