import React from "react";
import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import TimeTimer from "../components/timeTimer/TimeTimer";
import MainDday from "../components/dDay/MainDday";
import styles from "./css/mainPage.module.css";
import Footer from "../components/footer/Footer";
import ToDo from "./ToDo";
import TodoBtn from "../components/todo/TodoBtn";
import SurveyModal from "../components/surveyModal/SurveyModal";
import chicken from "../common/svg/cta_button.svg";
import { useNavigate } from "react-router-dom";
import Gradient from "./mainPage/Gradient";
import Studying from "../components/studying/Studying";
import Timer from "./mainPage/Timer";

const MainPage = () => {
  const [todoMode, setTodoMode] = useState("normal");
  const [btsOn, setBtsOn] = useState(false);
<<<<<<< HEAD
  const [timeMode, setTimeMode] = useState("normal");
  const [color, setColor] = useState("#7E7C8C");
  const [info, setInfo] = useState(localStorage.info ? true : false);
=======
>>>>>>> 7fa61d8eeddd67d90536cbaca2225cf181b2f815
  const [survey, setSurvey] = useState(false);

  const navi = useNavigate();

  useEffect(() => {
    localStorage.getItem("token") === null && navi("/");
  }, []);

  return (
    <Layout>
      <img
        src={chicken}
        alt="치킨"
        className={styles.chicken}
        onClick={() => {
          setSurvey(true);
        }}
      />
      <div className={styles.columnBox}>
        <div>
          <Studying />
          <MainDday />
          <Timer />
        </div>
        <TimeTimer />
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
<<<<<<< HEAD
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
      {(info || localStorage.info) && (
        <div
          className={styles.blur}
          onClick={() => {
            localStorage.removeItem("info");
            setInfo(false);
          }}
        />
      )}
=======
      </div>
      <div className={btsOn ? styles.todoBtsOn : styles.todoBtsOff}>
        <ToDo />
      </div>
      {survey && <SurveyModal setSurvey={setSurvey} />}
      <Gradient />
>>>>>>> 7fa61d8eeddd67d90536cbaca2225cf181b2f815
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
