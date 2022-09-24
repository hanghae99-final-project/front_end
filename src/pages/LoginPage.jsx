import React from "react";
import { ReactComponent as KakaoLoginButton } from "../common/svg/kakao_icon.svg";
import { ReactComponent as Logo } from "../common/svg/logo.svg";
import { ReactComponent as Tootip } from "../common/svg/loginPage_tootip.svg";
import Layout from "../layout/Layout";
import styles from "./css/loginPage.module.css";
import "animate.css";

const LoginPage = () => {
    const authURI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

    return (
        <Layout>
            <Logo className={`${styles.logo} animate__animated animate__fadeInDown`} />
            <div className={styles.kakaoButton}>
                <Tootip className={`${styles.tootip} animate__animated animate__pulse animate__infinite animate__delay-1s`} />
                <KakaoLoginButton
                    onClick={() => {
                        window.location.href = authURI;
                    }}
                />
            </div>
            <div className={styles.background}></div>
        </Layout>
    );
};

export default LoginPage;
