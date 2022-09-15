
import React from 'react';
import WeeklyDataGraph from '../components/WeeklyDataGraph';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import ProfileModify from "../components/profile/ProfileModify";

const MyPage = () => {
    return (
        <Layout>
            <ProfileModify />
            <WeeklyDataGraph />
            <Footer />
        </Layout>
    );

};

export default MyPage;
