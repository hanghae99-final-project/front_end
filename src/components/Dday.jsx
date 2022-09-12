import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { __getDday } from '../app/slice/DdaySlice';

const Dday = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(__getDday());
    }, []);
    return <div></div>;
};

export default Dday;
