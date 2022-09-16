import React from 'react';
import WeeklyDataGraph from '../components/WeeklyDataGraph';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import ProfileModify from '../components/profile/ProfileModify';
import MyPageStudyTime from '../components/MyPageStudyTime';

const MyPage = () => {
    return (
        <Layout>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {/* <ProfileModify /> */}
                <MyPageStudyTime />
                <WeeklyDataGraph />
                <Footer />
            </div>
        </Layout>
    );
};

export default MyPage;
