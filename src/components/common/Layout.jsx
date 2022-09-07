import React from 'react';
import styled from 'styled-components';

const Layout = (props) => {
    return <StyledLayout>{props.children}</StyledLayout>;
};

const StyledLayout = styled.div`
    position: relative;
    margin: 0 auto;
    height: 100vh;
    display: flex;
    justify-content: center;
    background-color: #e0e0e0;
    @media (max-width: 1200px) {
        width: 100%;
    }
    @media (min-width: 1200px) {
        width: 1200px;
    }
`;

export default Layout;
