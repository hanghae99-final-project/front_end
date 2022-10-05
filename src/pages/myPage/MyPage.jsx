import React from "react";
import WeeklyDataGraph from "../../components/weeklyGraph/WeeklyDataGraph";
import Layout from "../../layout/Layout";
import Footer from "../../components/footer/Footer";
import MyPageStudyTime from "../../components/totalStudyTime/MyPageStudyTime";
import { ReactComponent as Person } from "../../common/svg/person.svg";
import { ReactComponent as Event } from "../../common/svg/event_available.svg";
import styles from "../css/mypage.module.css";
import { Link, useNavigate } from "react-router-dom";
import ContentsBox from "./ContentsBox";
import font from "../../common/css/font.module.css";

const MyPage = () => {
  const navi = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navi("/");
  };

  return (
    <Layout>
      <button className={`${styles.logoutBtn} ${font.subtitle4_600_12}`} onClick={logout}>
        로그아웃
      </button>
      <div className={styles.box}>
        <MyPageStudyTime />
        <div className={styles.underBox}>
          <div className={styles.buttonBox}>
            <Link to="/modify">
              <button className={`${styles.profileButton} ${font.subtitle4_600_12}`}>
                <Person />
                <span>프로필 설정</span>
              </button>
            </Link>
            <Link to="/dday">
              <button className={`${styles.profileButton} ${font.subtitle4_600_12}`}>
                <Event />
                <span>디데이 설정</span>
              </button>
            </Link>
          </div>
          <ContentsBox />
          <WeeklyDataGraph />
          <Footer />
        </div>
      </div>
    </Layout>
  );
};

export default MyPage;
