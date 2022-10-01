import React from "react";
import { ReactComponent as KakaoLoginButton } from "../common/svg/kakao_icon.svg";
import { ReactComponent as Logo } from "../common/svg/logo.svg";
import Layout from "../layout/Layout";
import styles from "./css/loginPage.module.css";
import font from "../common/css/font.module.css";
import "animate.css";
import { useRef, useEffect, useState } from "react";
import { Blur } from "./mainPage/Styled";

const LoginPage = () => {
  const authURI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  const [visible, setVisible] = useState(false);

  const deferredPrompt = useRef(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      deferredPrompt.current = e;
    });

    if (!deferredPrompt.current) {
      setVisible(false);
    }
    setVisible(true);
  }, []);

  const installApp = () => {
    if (!deferredPrompt.current) return false;

    //홈 화면에 추가시키기
    deferredPrompt.current.prompt();

    deferredPrompt.current.userChoice.then(choice => {
      if (choice.outcome === "accepted") {
        setVisible(false);
      }
    });
  };

  const onClickNo = () => {
    setVisible(false);
  };
  return (
    <Layout>
      {visible && (
        <>
          <div className={`${styles.modal} ${font.subtitle2_600_16}`}>
            <p>
              환영합니다🙌 <br />
              원활한 사용을 위해 앱을 설치해 보세요
            </p>
            <div className={styles.buttonBox}>
              <button className={`${styles.installButton} ${font.subtitle2_600_16}`} onClick={installApp}>
                설치하기
              </button>
              <button className={`${styles.closeButton} ${font.subtitle2_600_16}`} onClick={onClickNo}>
                닫기
              </button>
            </div>
          </div>
          <Blur onClick={() => setVisible(false)} />
        </>
      )}
      <Logo className={`${styles.logo} animate__animated animate__fadeInDown`} />
      <div className={styles.kakaoButton}>
        <div className={`${styles.tooltipBox}  animate__animated animate__pulse animate__infinite animate__delay-1s`}>
          <p className={`${styles.tooltip} ${font.caption2_600_10}`}>🎉3초만에 빠른 회원가입</p>
          <div className={styles.tooltipVector}></div>
        </div>
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
