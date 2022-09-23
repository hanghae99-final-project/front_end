import React from "react";
import WeeklyDataGraph from "../components/weeklyGraph/WeeklyDataGraph";
import Layout from "../layout/Layout";
import Footer from "../components/footer/Footer";
import MyPageStudyTime from "../components/totalStudyTime/MyPageStudyTime";
import { ReactComponent as Person } from "../common/svg/person.svg";
import { ReactComponent as Event } from "../common/svg/event_available.svg";
import styles from "./css/mypage.module.css";
import ProfileTodoList from "../components/profile/ProfileTodoList";
import Calender from "../components/calender/Calender";
import { Link } from "react-router-dom";

const MyPage = () => {
    return (
        <Layout>
            <div className={styles.box}>
                <MyPageStudyTime />
                <div className={styles.underBox}>
                    <div className={styles.buttonBox}>
                        <Link to='/modify'>
                            <button className={styles.profileButton}>
                                <Person />
                                <span>프로필 설정</span>
                            </button>
                        </Link>
                        <Link to='/dday'>
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
            </div>
        </Layout>
    );
};

export default MyPage;
