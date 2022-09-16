import React from 'react';
import WeeklyDataGraph from '../components/WeeklyDataGraph';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import ProfileModify from '../components/profile/ProfileModify';
import MyPageStudyTime from '../components/MyPageStudyTime';
import { ReactComponent as Person } from '../svg/person.svg';
import { ReactComponent as Event } from '../svg/event_available.svg';
import styles from '../css/mypage.module.css';
import ProfileTodoList from '../components/profile/ProfileTodoList';

const MyPage = () => {
    return (
        <Layout>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                {/* <ProfileModify /> */}
                <MyPageStudyTime />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className={styles.profileButton}>
                        <Person />
                        <span>프로필 설정</span>
                    </button>
                    <button className={styles.profileButton}>
                        <Event />
                        <span>디데이 설정</span>
                    </button>
                </div>
                <div style={{ display: 'flex', padding: '0.7rem', gap: '10px' }}>
                    <ProfileTodoList />
                    <ProfileTodoList />
                </div>
                <WeeklyDataGraph />
                <Footer />
            </div>
        </Layout>
    );
};

export default MyPage;
