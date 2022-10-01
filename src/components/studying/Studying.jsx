import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getStuding } from "../../app/slice/mainSlice";
import styles from "./studing.module.css";
import alert from "../../common/svg/alert_icon.svg";
import "../../common/css/color.css";
import font from "../../common/css/font.module.css";
import { useState } from "react";
import InfoModal from "../infoModal/InfoModal";
import { Blur } from "../../pages/mainPage/Styled";

const Studying = () => {
  const dispatch = useDispatch();
  const [info, setInfo] = useState(localStorage.info ? true : false);
  const studying = useSelector(state => state.main?.studing);
  useEffect(() => {
    dispatch(__getStuding());
  }, [dispatch]);
  return (
    <>
      <div className={`${styles.studing} ${font.body2_300_14}`}>
        <img
          src={alert}
          alt="도움말 툴팁"
          className={styles.alert}
          onClick={() => {
            setInfo(true);
          }}
        />
        <div className={styles.online}></div>
        <span>지금 공부 중인 사람은 {studying}명이에요 </span>
      </div>
      {(info || localStorage.info) && (
        <>
          <InfoModal setInfo={setInfo} info={info} />
          <Blur
            onClick={() => {
              setInfo(false);
              localStorage.removeItem("info");
            }}
          />
        </>
      )}
    </>
  );
};

export default Studying;
