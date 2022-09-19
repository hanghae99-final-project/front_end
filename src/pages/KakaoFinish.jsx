import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { get_login } from '../app/slice/mainSlice';

const KakaoFinish = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const use = useSelector((state) => state.main);
    const authCode = location.search.split('=')[1];
    useEffect(() => {
        dispatch(get_login(authCode));
    }, []);

    useEffect(() => {
        if (use?.user?.nickname !== '') {
            if (use.token !== undefined) {
                console.log(use.token);
                localStorage.setItem('token', use.token);
                if (localStorage.token !== undefined) {
                    navigate('/home', { state: localStorage.token });
                }
            }
        } else {
            navigate('/join');
        }
    }, [use]);

    return <div>gd</div>;
};

export default KakaoFinish;
