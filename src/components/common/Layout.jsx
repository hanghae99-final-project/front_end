import React from 'react';
import styled from 'styled-components';
import '../../css/color.css';

const Layout = (props) => {
    return <StyledLayout>{props.children}</StyledLayout>;
};

const StyledLayout = styled.div`
    margin: 0 auto;
    height: 100vh;
    
    justify-content: center;
    align-items: center;
    background-color: var(--neutral-20);
    /* background-image: linear-gradient(to bottom, var(--neutral-20), #4f3f40 43%, #996153 73%, var(--secondary-60)); */
    background-image: linear-gradient(to bottom, var(--neutral-20), #3b4f4b 34%, #558d71 74%, var(--primary-60));
    @media (max-width: 1200px) {
        width: 100%;
    }
    @media (min-width: 1200px) {
        width: 1200px;
    }
`;

export default Layout;
