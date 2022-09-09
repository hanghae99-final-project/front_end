import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { get_login } from '../app/slice/mainSlice';
import jwtDecode from 'jwt-decode';

const KakaoFinish = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const use = useSelector((state) => state.main);
    const authCode = location.search.split('=')[1];
    console.log(use);
    useEffect(() => {
        dispatch(get_login(authCode));
    }, []);

    if (use?.user?.nickname !== undefined) {
        localStorage.setItem('token', use.token);
        navigate('/');
    } else {
        navigate('/todo');
    }

    //   localStorage.setItem("token", use);
    //   //   const token = jwtDecode(localStorage.token);
    //   if (localStorage.token !== "") {
    //   }

    //   console.log(jwtDecode(use));
    return <div>gd</div>;
};

export default KakaoFinish;
