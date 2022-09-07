import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { get_login } from '../app/slice/mainSlice';

const KakaoFinish = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authCode = location.search.split('=')[1];
    console.log(authCode);
    useEffect(() => {
        dispatch(get_login(authCode));
    }, []);
    return <div>gd</div>;
};

export default KakaoFinish;
