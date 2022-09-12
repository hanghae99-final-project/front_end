import React from 'react';
import Stopwatch from '../components/Stopwatch';
import Layout from '../components/common/Layout';
import Quote from '../components/Quote';
import Studing from '../components/Studing';
import TimeTimer from '../components/TimeTimer';
import Dday from '../components/Dday';
import alert from '../image/alert_icon.svg';
import styles from '../css/mainPage.module.css';
import TimerButton from '../components/TimerButton';

const Home = () => {
    return (
        <Layout>
            <div className={styles.aboveBox}>
                <img src={alert} alt='도움말 툴팁' className={styles.alert} />
                <Studing />
                <Stopwatch />
            </div>
            <div>
                <Dday />
            </div>
            <div>
                <TimeTimer />
            </div>
            <div>
                <Quote />
            </div>
            <div>
                <TimerButton />
            </div>
        </Layout>
    );
};

export default Home;
