import React from 'react';
import Stopwatch from '../components/Stopwatch';
import Layout from '../components/common/Layout';
import Studing from '../components/Studing';
import TimeTimer from '../components/TimeTimer';
import Dday from '../components/Dday';
import alert from '../image/alert_icon.svg';
import styles from '../css/mainPage.module.css';
import styled from 'styled-components';
import Footer from '../components/common/Footer';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Home = () => {
    const color = useSelector((state) => state.color);
    const [mode, setMode] = useState('normal');
    const [timeMode, setTimeMode] = useState('normal');
    return (
        <Layout>
            <Gradient color={color}>
                <div className={styles.aboveBox}>
                    <img src={alert} alt='도움말 툴팁' className={styles.alert} />
                    <Studing />
                    <Stopwatch mode={mode} setMode={setMode} />
                </div>
                <Dday />
                <TimeTimer timeMode={timeMode} setTimeMode={setTimeMode} />
            </Gradient>
            <Footer />
            {mode === 'set' && (
                <div
                    className={styles.blur}
                    onClick={() => {
                        setMode('normal');
                    }}
                />
            )}
            {timeMode === 'set' && (
                <div
                    className={styles.blur}
                    onClick={() => {
                        setTimeMode('normal');
                    }}
                />
            )}
        </Layout>
    );

};

export default Home;

const Gradient = styled.div`
    width: 100%;
    height: 100%;
    background-image: ${(props) => {
        switch (props.color) {
            case 'green':
                return 'linear-gradient(to bottom, var(--neutral-20), #3b4f4b 34%, #558d71 74%, var(--primary-60))';
            case 'blue':
                return 'linear-gradient(to bottom, var(--neutral-20), #445364 48%, #5f809b 75%, var(--tertiary-60))';
            case 'red':
                return 'linear-gradient(to bottom, var(--neutral-20), #4f3f40 43%, #996153 73%, var(--secondary-60))';
            default:
                return 'transparent';
        }
    }};
`;
