import React from "react";
import { useState } from "react";
import Layout from "../../layout/Layout";
import MainContentBox from "./MainContentBox";
import MainDday from "../../components/dDay/MainDday";
import styles from "../css/mainPage.module.css";
import Footer from "../../components/footer/Footer";
import TodoModal from "../../components/todo/TodoModal";
import TodoBtn from "../../components/todo/TodoBtn";
import SurveyModal from "../../components/surveyModal/SurveyModal";
import Gradient from "./Gradient";
import Studying from "../../components/studying/Studying";
import Timer from "./Timer";

const MainPage = () => {
  const [todoMode, setTodoMode] = useState("normal");
  const [btsOn, setBtsOn] = useState(false);
  const [survey, setSurvey] = useState(false);

  return (
    <Layout>
      <div className={styles.columnBox}>
        <div>
          {/* 추후 이벤트 or 공지사항으로 사용하기 위해 주석처리 */}
          {/* <img
            src={chicken}
            alt="치킨"
            className={styles.chicken}
            onClick={() => {
              setSurvey(true);
            }}
          /> */}
          <Studying />
          <MainDday />
          <Timer />
        </div>
        <MainContentBox />
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
