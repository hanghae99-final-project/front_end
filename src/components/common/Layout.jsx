import React from 'react';
import styled from 'styled-components';
import '../../css/color.css';

const Layout = (props) => {
    return <StyledLayout>{props.children}</StyledLayout>;
};

const StyledLayout = styled.div`
    position: relative;
    margin: 0 auto;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--neutral-20);
    @media (max-width: 1200px) {
        width: 100%;
    }
    @media (min-width: 1200px) {
        width: 1200px;
    }
`;

export default Layout;
