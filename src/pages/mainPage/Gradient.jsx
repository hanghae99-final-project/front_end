import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Gradient = () => {
  const color = useSelector(state => state.color);
  return <Background color={color} />;
};

export default Gradient;

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 0;
  background-image: ${props => {
    switch (props.color) {
      case "green":
        return "linear-gradient(to bottom, var(--neutral-20), #3b4f4b 34%, #558d71 74%, var(--primary-60))";
      case "blue":
        return "linear-gradient(to bottom, var(--neutral-20), #445364 48%, #5f809b 75%, var(--tertiary-60))";
      case "red":
        return "linear-gradient(to bottom, var(--neutral-20), #4f3f40 43%, #996153 73%, var(--secondary-60))";
      default:
        return "transparent";
    }
  }};
`;
