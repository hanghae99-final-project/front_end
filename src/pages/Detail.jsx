import React from 'react';
import { ReactComponent as KakaoLoginButton } from '../svg/kakao_icon.svg';
import Layout from '../components/common/Layout';

const Detail = () => {
    const authURI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

    return (
        <Layout>
            <KakaoLoginButton
                onClick={() => {
                    window.location.href = authURI;
                }}
            />
        </Layout>
    );
};

export default Detail;
