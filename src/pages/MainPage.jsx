import React from "react";
import Stopwatch from "../components/stopwatch/Stopwatch";
import Layout from "../layout/Layout";
import Studing from "../components/studying/Studying";
import TimeTimer from "../components/timeTimer/TimeTimer";
import MainDday from "../components/dDay/MainDday";
import alert from "../common/svg/alert_icon.svg";
import styles from "./css/mainPage.module.css";
import styled from "styled-components";
import Footer from "../components/footer/Footer";
import { useSelector } from "react-redux";
import { useState } from "react";
import ToDo from "./ToDo";
import TodoBtn from "../components/todo/TodoBtn";
import InfoModal from "../components/infoModal/InfoModal";
import SurveyModal from "../components/surveyModal/SurveyModal";
import chicken from "../common/svg/chicken.png";

const MainPage = () => {
  const backgroundColor = useSelector(state => state.color);
  const [mode, setMode] = useState("normal");
  const [todoMode, setTodoMode] = useState("normal");
  const [btsOn, setBtsOn] = useState(false);
  const [timeMode, setTimeMode] = useState("normal");
  const [color, setColor] = useState("#7E7C8C");
  const [info, setInfo] = useState(false);
  const [survey, setSurvey] = useState(false);

  return (
    <Layout>
      <Gradient backgroundColor={backgroundColor}>
        <div className={styles.columnBox}>
          <div>
            <div className={styles.aboveBox}>
              <img
                src={alert}
                alt="도움말 툴팁"
                className={styles.alert}
                onClick={() => {
                  setInfo(true);
                }}
              />
              <Studing />
              <Stopwatch mode={mode} setMode={setMode} color={color} setColor={setColor} />
            </div>
            <MainDday />
          </div>
          <div>
            <TimeTimer timeMode={timeMode} setTimeMode={setTimeMode} />
          </div>
          <div>
            <div
              onClick={() => {
                setBtsOn(!btsOn);
                setTodoMode("set");
              }}
            >
              <TodoBtn />
            </div>
            <Footer />
          </div>
        </div>
        <div className={btsOn ? styles.todoBtsOn : styles.todoBtsOff}>
          <ToDo />
        </div>
        {info && <InfoModal setInfo={setInfo} />}
        {survey && <SurveyModal setSurvey={setSurvey} />}
        <img
          src={chicken}
          alt="치킨"
          className={styles.chicken}
          onClick={() => {
            setSurvey(true);
          }}
        />
      </Gradient>
      {(mode === "set" || mode === "complete") && (
        <div
          className={styles.blur}
          onClick={() => {
            setColor("#7E7C8C");
            setMode("normal");
          }}
        />
      )}
      {timeMode === "set" && (
        <div
          className={styles.blur}
          onClick={() => {
            setTimeMode("normal");
          }}
        />
      )}
      {info && (
        <div
          className={styles.blur}
          onClick={() => {
            setInfo(false);
          }}
        />
      )}
      {survey && (
        <div
          className={styles.blur}
          onClick={() => {
            setSurvey(false);
          }}
        />
      )}
      {todoMode === "set" && (
        <div
          className={styles.blur}
          onClick={() => {
            setTodoMode("normal");
            setBtsOn(false);
          }}
        />
      )}
    </Layout>
  );
};

export default MainPage;

const Gradient = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-image: ${props => {
    switch (props.backgroundColor) {
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
