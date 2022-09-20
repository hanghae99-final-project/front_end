import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Home } from '../../common/svg/home_icon.svg';
import { ReactComponent as Rank } from '../../common/svg/ranking_icon.svg';
import { ReactComponent as Stats } from '../../common/svg/stats_icon.svg';
import '../../common/css/color.css';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    return (
        <FooterBar>
            <Link to='/ranking'>
                <Rank fillOpacity={location.pathname === '/ranking' ? 1 : 0.3} />
            </Link>
            <Link to='/home'>
                <Home fillOpacity={location.pathname === '/home' ? 1 : 0.3} />
            </Link>
            <Link to='/mypage'>
                <Stats fillOpacity={location.pathname === '/mypage' ? 1 : 0.3} />
            </Link>
        </FooterBar>
    );
};

export default Footer;

const FooterBar = styled.nav`
    height: 8vh;
    display: flex;
    align-items: center;
    background-color: var(--neutral-20);
    justify-content: space-around;
    width: 100%;
    /* @media (max-width: 1200px) {
        width: 100%;
    }
    @media (min-width: 1200px) {
        width: 1200px;
    } */
    z-index: 999;
`;
