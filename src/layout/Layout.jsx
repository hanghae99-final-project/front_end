import React from "react";
import styled from "styled-components";
import "../common/css/color.css";

const Layout = (props) => {
    return <StyledLayout>{props.children}</StyledLayout>;
};

const StyledLayout = styled.div`
    margin: 0 auto;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: var(--neutral-20);
    overflow: hidden;
    width: 360px;
`;

export default Layout;
