import React from 'react';
import styled from 'styled-components';
import home from '../../image/home_icon.svg';
import ranking from '../../image/ranking_icon.svg';
import stats from '../../image/stats_icon.svg';
import community from '../../image/community_icon.svg';
import '../../css/color.css';

const Footer = () => {
    return (
        <FooterBar>
            <img src={home} alt='home' />
            <img src={ranking} alt='ranking' />
            <img src={community} alt='community' />
            <img src={stats} alt='stats' />
        </FooterBar>
    );
};

export default Footer;

const FooterBar = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    background-color: var(--neutral-20);
    position: fixed;
    bottom: 0;
    padding: 0.75rem 1rem;
    /* margin-top: 10rem; */
    justify-content: space-around;
    img {
        width: 4rem;
        height: 4rem;
        margin-top: 0.4rem;
    }
`;
