import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getRanking } from "../../app/slice/rankingSlice";
import Footer from "../../components/footer/Footer";
import styles from "./../css/rankingPage.module.css";
import dropdownBtn from "../../common/svg/dropdown_icon.svg";
import font from "../../common/css/font.module.css";
import { useNavigate } from "react-router-dom";
import RankingCtn from "./RankingCtn";

<<<<<<< HEAD
const RankingBox = ({ btsOn, setBtsOn, ageMode, type, setType }) => {
=======
const RankingBox = ({ btsOn, setBtsOn, ageMode, setAgeMode, type, setType }) => {
>>>>>>> 9b859214b3db9aeed0345fdcd93235971d29eec7
  const dispatch = useDispatch();
  const getMyRanking = useSelector(state => state.ranking.myRanking);
  const getAllRanking = useSelector(state => state.ranking.ranking);
  const navi = useNavigate();

  const datePick = [
    { ko: "일간", en: "day" },
    { ko: "주간", en: "week" },
    { ko: "월간", en: "month" }
  ];
  const [mode, setMode] = useState("일간");

  useEffect(() => {
    localStorage.getItem("token") === null && navi("/");
  }, []);

  useEffect(() => {
    dispatch(__getRanking(type));
  }, [type]);

  const modalOffHandler = e => {
    setBtsOn(false);
  };

<<<<<<< HEAD
=======
  console.log(type);

>>>>>>> 9b859214b3db9aeed0345fdcd93235971d29eec7
  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={btsOn ? styles.blurIn : styles.blurOut} onClick={modalOffHandler}>
            <div className={`${styles.rankingType} ${font.subtitle2_600_16}`}>
              <div
                className={styles.topBtn}
                onClick={e => {
                  e.stopPropagation();
                  setBtsOn(!btsOn);
                }}
              >
                <p>{ageMode}</p>
                <div className={styles.dropdownBtn} src={dropdownBtn} alt="arrowBtn2"></div>
              </div>
            </div>
            <div className={`${styles.dateRanking}`}>
              {datePick.map((day, i) => {
                return (
                  <div key={i}>
<<<<<<< HEAD
                    <button
                      className={`${styles.button} ${font.subtitle4_600_12}`}
                      style={
                        mode === day.ko
                          ? {
                              backgroundColor: "var(--neutral-40)",
                              color: "var(--neutral-100)"
                            }
                          : {
                              backgroundColor: "var(--neutral-30)",
                              color: "var(--neutral-70)"
                            }
                      }
                      onClick={() => {
                        setMode(day.ko);
                        setType({ ...type, period: day.en });
                      }}
                    >
                      {day.ko}
                    </button>
=======
                    {mode === day.ko ? (
                      <button
                        className={`${styles.button} ${font.subtitle4_600_12}`}
                        style={{
                          backgroundColor: "var(--neutral-40)",
                          color: "var(--neutral-100)"
                        }}
                        onClick={() => {
                          setMode(day.ko);
                          setType({ ...type, period: day.en });
                        }}
                      >
                        {day.ko}
                      </button>
                    ) : (
                      <button
                        className={`${styles.button} ${font.subtitle4_600_12}`}
                        style={{
                          backgroundColor: "var(--neutral-30)",
                          color: "var(--neutral-70)"
                        }}
                        onClick={() => {
                          setType({ ...type, period: day.en });

                          setMode(day.ko);
                        }}
                      >
                        {day.ko}
                      </button>
                    )}
>>>>>>> 9b859214b3db9aeed0345fdcd93235971d29eec7
                  </div>
                );
              })}
            </div>
            <div className={styles.rankingContainer}>
              {getAllRanking.map((rankbox, i) => {
                return (
                  <div key={i}>
                    <div
                      className={
                        i === 0
                          ? `${styles.topRanker} ${font.subtitle4_600_12}`
                          : i === 1 || i === 2
                          ? `${styles.otherRanker} ${font.subtitle4_600_12}`
                          : `${styles.allStatus} ${font.subtitle4_600_12}`
                      }
                    >
                      <RankingCtn i={i} rankbox={rankbox} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div className={styles.myStatus}>
            <RankingCtn rankbox={getMyRanking} i={getMyRanking.rank - 1} myStatus={true} />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default RankingBox;
