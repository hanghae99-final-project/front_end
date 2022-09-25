import React from "react";
import styles from "./surveyModal.module.css";
import font from "../../common/css/font.module.css";
import survey from "../../common/svg/surveyImg.png";

const SurveyModal = ({ setSurvey }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.imgBox}>
        <img src={survey} alt="설문조사" className={styles.surveyImg} />
        <div className={`${styles.surveyText} ${font.subtitle2_300_16}`}>
          <div>
            랭플 회원들에게 <span className={styles.accent}>치킨쏜닭</span> !
          </div>
          <div>지금 설문조사 참여하고 치킨받자🍗</div>
        </div>
      </div>
      <button className={`${styles.chicken} ${font.subtitle2_600_16}`}>
        <a href="https://forms.gle/nPxMeV8PRDZzahTd9">치킨 받으러 가기</a>
      </button>
      <button
        className={`${styles.close} ${font.subtitle2_600_16}`}
        onClick={() => {
          setSurvey(false);
        }}
      >
        닫기
      </button>
    </div>
  );
};

export default SurveyModal;
