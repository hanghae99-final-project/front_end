import React from "react";
import styled from "styled-components";
import "../common/css/color.css";

const Layout = (props) => {
  return <StyledLayout>{props.children}</StyledLayout>;
};

const StyledLayout = styled.div`
  margin: 0 auto;
  height: 800px;
  justify-content: center;
  align-items: center;
  background-color: var(--neutral-20);
  overflow: hidden;
  min-width: 360px;
  @media (min-width: 360px) {
    width: 100%;
  }
  @media (min-width: 640px) {
    width: 640px;
  }
`;

export default Layout;
