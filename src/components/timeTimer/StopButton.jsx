import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { __postStudyEnd } from "../../app/slice/timeTimerSlice";
import "../../common/css/color.css";
import { ReactComponent as Stop } from "../../common/svg/stop_icon.svg";
import font from "../../common/css/font.module.css";

const StopButton = ({ onClickHandler }) => {
  const color = useSelector(state => state.color);

  return (
    <StopBtn color={color} onClick={onClickHandler}>
      <Stop fill={color === "green" ? "var(--neutral-10)" : "var(--neutral-100)"} />
      <div className={font.subtitle2_600_16}>그만하기</div>
    </StopBtn>
  );
};

export default StopButton;

const StopBtn = styled.button`
  width: 50%;
  height: 3.75rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  &:active {
    filter: brightness(55%);
  }
  background-color: ${props => {
    switch (props.color) {
      case "green":
        return "var(--primary-50)";
      case "blue":
        return "var(--neutral-10)";
      case "red":
        return "var(--secondary-50)";
      default:
        return "var(--neutral-10)";
    }
  }};

  div {
    width: 3.5rem;
    height: 1.5rem;
    flex-grow: 0;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;
    text-align: center;
    color: ${props => {
      switch (props.color) {
        case "green":
          return "var(--neutral-10)";
        case "blue":
          return "var(--neutral-100)";
        case "red":
          return "var(--neutral-100)";
        default:
          return "var(--neutral - 100)";
      }
    }};
  }
`;
