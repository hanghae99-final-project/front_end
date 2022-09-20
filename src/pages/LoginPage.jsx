import React from 'react';
import { ReactComponent as KakaoLoginButton } from '../common/svg/kakao_icon.svg';
import { ReactComponent as Logo } from '../common/svg/logo.svg';
import Layout from '../layout/Layout';
import styles from './css/loginPage.module.css';

const LoginPage = () => {
    const authURI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

    return (
        <Layout>
            <div className={styles.background}>
                <Logo className={styles.logo} />
                <KakaoLoginButton
                    className={styles.kakaoButton}
                    onClick={() => {
                        window.location.href = authURI;
                    }}
                />
            </div>
        </Layout>
    );
};

export default LoginPage;
