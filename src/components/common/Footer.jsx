import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Home } from '../../image/home_icon.svg';
import { ReactComponent as Rank } from '../../image/ranking_icon.svg';
import { ReactComponent as Stats } from '../../image/stats_icon.svg';
import '../../css/color.css';
import { Link, useLocation } from 'react-router-dom';
// #fff
const Footer = () => {
    const location = useLocation();
    console.log(location);
    return (
        <FooterBar>
            <Link to='/ranking'>
                <Rank fill-opacity={location.pathname === '/ranking' ? 1 : 0.3} />
            </Link>
            <Link to='/home'>
                <Home fill-opacity={location.pathname === '/home' ? 1 : 0.3} />
            </Link>
            <Link to='/mypage'>
                <Stats fill-opacity={location.pathname === '/mypage' ? 1 : 0.3} />
            </Link>
        </FooterBar>
    );
};

export default Footer;

const FooterBar = styled.div`
    height: 4rem;
    display: flex;
    align-items: center;
    background-color: var(--neutral-20);
    position: fixed;
    bottom: 0;
    justify-content: space-around;
    @media (max-width: 1200px) {
        width: 100%;
    }
    @media (min-width: 1200px) {
        width: 1200px;
    }
`;
