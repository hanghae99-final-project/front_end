import React from 'react';
import WeeklyDataGraph from '../components/WeeklyDataGraph';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
const MyPage = () => {
    return (
        <Layout>
            <WeeklyDataGraph />
            <Footer />
        </Layout>
    );
};

export default MyPage;
