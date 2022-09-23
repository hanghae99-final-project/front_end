import React, { useEffect } from "react";
import WeeklyDataGraph from "../components/weeklyGraph/WeeklyDataGraph";
import Layout from "../layout/Layout";
import Footer from "../components/footer/Footer";
import MyPageStudyTime from "../components/totalStudyTime/MyPageStudyTime";
import { ReactComponent as Person } from "../common/svg/person.svg";
import { ReactComponent as Event } from "../common/svg/event_available.svg";
import styles from "./css/mypage.module.css";
import ProfileTodoList from "../components/profile/ProfileTodoList";
import Calender from "../components/calender/Calender";
import { Link, useNavigate } from "react-router-dom";
import font from "../common/css/font.module.css";

const MyPage = () => {
    console.log(localStorage.getItem("token"));
    const navi = useNavigate();

    useEffect(() => {
        localStorage.getItem("token") === null && navi("/");
    }, []);
    const logout = () => {
        localStorage.removeItem("token");
        navi("/");
    };

    return (
        <Layout>
            <button className={`${styles.logoutBtn} ${styles.subtitle4_600_12}`} onClick={logout}>
                로그아웃
            </button>
            <div className={styles.box}>
                <MyPageStudyTime />
                <div className={styles.buttonBox}>
                    <Link to="/modify">
                        <button className={styles.profileButton}>
                            <Person />
                            <span>프로필 설정</span>
                        </button>
                    </Link>
                    <Link to="/dday">
                        <button className={styles.profileButton}>
                            <Event />
                            <span>디데이 설정</span>
                        </button>
                    </Link>
                </div>
                <div className={styles.contentBox}>
                    <Calender />
                    <ProfileTodoList />
                </div>
                <WeeklyDataGraph />
                <Footer />
            </div>
        </Layout>
    );
};

export default MyPage;
