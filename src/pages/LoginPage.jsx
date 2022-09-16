import React from 'react';
import { ReactComponent as KakaoLoginButton } from '../svg/kakao_icon.svg';
import { ReactComponent as LoginSplash } from '../svg/loginSplash_background.svg';
import { ReactComponent as Logo } from '../svg/logo.svg';
import Layout from '../components/common/Layout';
import styles from '../css/loginPage.module.css';

const LoginPage = () => {
    const authURI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

    return (
        <Layout>
            <LoginSplash className={styles.background} />
            <Logo className={styles.logo} />
            <KakaoLoginButton
                className={styles.kakaoButton}
                onClick={() => {
                    window.location.href = authURI;
                }}
            />
        </Layout>
    );
};

export default LoginPage;
