import React from "react";
import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import TimeTimer from "../components/timeTimer/TimeTimer";
import MainDday from "../components/dDay/MainDday";
import styles from "./css/mainPage.module.css";
import Footer from "../components/footer/Footer";
import TodoModal from "../components/todo/TodoModal";
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
  const [survey, setSurvey] = useState(false);
  const navi = useNavigate();

  useEffect(() => {
    localStorage.getItem("token") === null && navi("/");
  }, []);

  return (
    <Layout>
      <div className={styles.columnBox}>
        <div>
          <img
            src={chicken}
            alt="치킨"
            className={styles.chicken}
            onClick={() => {
              setSurvey(true);
            }}
          />
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
      </div>
      <div className={btsOn ? styles.todoBtsOn : styles.todoBtsOff}>
        <TodoModal />
      </div>
      {survey && <SurveyModal setSurvey={setSurvey} />}
      <Gradient />
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
