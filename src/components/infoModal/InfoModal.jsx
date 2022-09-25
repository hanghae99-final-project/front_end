import React from "react";
import styles from "./infoModal.module.css";
import timer from "../../common/svg/timer.png";
import timeTimer from "../../common/svg/timeTimer.png";
import todoList from "../../common/svg/todoList.png";
import weeklyStudyLog from "../../common/svg/weeklyStudyLog.png";
import studyLog from "../../common/svg/studyLog.png";
import font from "../../common/css/font.module.css";
import { ReactComponent as Close } from "../../common/svg/close.svg";
import { useRef } from "react";

const InfoModal = ({ setInfo }) => {
  const modal = useRef();
  const information = [
    { img: timer, content: "특정 시간부터 시, 분을 설정해 카운트다운을 할 수 있어요.", title: "타이머" },
    { img: timeTimer, content: "경과한 시간과 남은 시간을 즉각적으로 인지할 수 있어요.", title: "타임타이머" },
    { img: todoList, content: "오늘 할 일을 간편하게 추가하고 빠르게 체크할 수 있어요.", title: "오늘 할 일" },
    { img: studyLog, content: "한 달간 나의 공부시간을 색상으로 한눈에 볼 수 있어요.", title: "스터디 로그" },
    { img: weeklyStudyLog, content: "스터디 로그를 주간 그래프로 더 한눈에 볼 수 있어요.", title: "주간 스터디 로그" }
  ];
  return (
    <div className={styles.modal} ref={modal}>
      <div className={`${styles.title} ${font.subtitle2_600_16}`}>
        <div>랭플 사용방법</div>
        <Close
          className={styles.close}
          onClick={() => {
            setInfo(false);
          }}
        />
      </div>
      {information.map((element, i) => {
        return (
          <div className={styles.elementBox}>
            <div className={`${styles.imgBox} ${i === 2 && styles.todo}`}>
              <img src={element.img} alt={element.title} />
            </div>
            <div className={styles.contentBox}>
              <div className={`${styles.contentTitle} ${font.subtitle3_600_14}`}>{element.title}</div>
              <p className={`${styles.elementContent} ${font.subtitle3_300_14}`}>{element.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InfoModal;
