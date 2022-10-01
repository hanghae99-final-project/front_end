import React from "react";
import styles from "./infoModal.module.css";
import timer from "../../common/svg/timer_popup.svg";
import timeTimer from "../../common/svg/time_timer_popup.svg";
import todoList from "../../common/svg/todolist_sheet_popup.svg";
import weeklyStudyLog from "../../common/svg/weeklylog_popup.svg";
import studyLog from "../../common/svg/studylog_popup.svg";
import font from "../../common/css/font.module.css";
import ModalTitle from "../modal/ModalTitle";

const InfoModal = ({ setInfo }) => {
  const information = [
    { img: timer, content: "특정 시간부터 시, 분을 설정해 카운트다운을 할 수 있어요.", title: "타이머" },
    { img: timeTimer, content: "경과한 시간과 남은 시간을 즉각적으로 인지할 수 있어요.", title: "타임타이머" },
    { img: todoList, content: "오늘 할 일을 간편하게 추가하고 빠르게 체크할 수 있어요.", title: "오늘 할 일" },
    { img: studyLog, content: "한 달간 나의 공부시간을 색상으로 한눈에 볼 수 있어요.", title: "스터디 로그" },
    { img: weeklyStudyLog, content: "스터디 로그를 주간 그래프로 더 한눈에 볼 수 있어요.", title: "주간 스터디 로그" }
  ];
  return (
    <div className={styles.modal}>
      <ModalTitle
        title="랭플 사용방법"
        func={() => {
          setInfo(false);
          localStorage.removeItem("info");
        }}
      />
      {information.map((element, i) => {
        return (
          <div className={styles.elementBox} key={element.title}>
            <div className={`${styles.imgBox} ${i === 2 && styles.todo}`}>
              <img src={element.img} alt={element.title} />
            </div>
            <div className={`${styles.contentBox} ${font.subtitle3_600_14}`}>
              <div className={styles.contentTitle}>{element.title}</div>
              <p className={styles.elementContent}>{element.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InfoModal;
