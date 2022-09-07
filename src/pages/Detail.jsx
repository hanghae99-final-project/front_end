import React, { useEffect } from 'react';
import { get_login } from '../app/slice/mainSlice';
import { useDispatch, useSelector } from 'react-redux';

const Detail = () => {
    const authURI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

    return (
        <div>
            <button
                onClick={() => {
                    window.location.href = authURI;
                }}>
                카카오 로그인
            </button>
        </div>
    );
};

export default Detail;
