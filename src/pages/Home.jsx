import React from 'react';
import Stopwatch from '../components/Stopwatch';
import Layout from '../components/common/Layout';
import Quote from '../components/Quote';
import Studing from '../components/Studing';

const Home = () => {
    return (
        <Layout>
            <Stopwatch />
            <Quote />
            <Studing />
        </Layout>
    );
};

export default Home;
