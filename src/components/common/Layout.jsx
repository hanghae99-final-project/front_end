import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "../../css/color.css";

const Layout = (props) => {
  const color = useSelector((state) => state.color);
  console.log(color);
  return <StyledLayout color={color}>{props.children}</StyledLayout>;
};

const StyledLayout = styled.div`
  margin: 0 auto;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: var(--neutral-20);
  background-image: ${(props) => {
    switch (props.color) {
      case "green":
        return "linear-gradient(to bottom, var(--neutral-20), #3b4f4b 34%, #558d71 74%, var(--primary-60))";
      case "blue":
        return "linear-gradient(to bottom, var(--neutral-20), #445364 48%, #5f809b 75%, var(--tertiary-60))";
      case "red":
        return "linear-gradient(to bottom, var(--neutral-20), #4f3f40 43%, #996153 73%, var(--secondary-60))";
      default:
        return "none";
    }
  }};
  @media (max-width: 1200px) {
    width: 100%;
  }
  @media (min-width: 1200px) {
    width: 1200px;
  }
`;

export default Layout;
