import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getRanking } from "../../app/slice/rankingSlice";
import Footer from "../../components/footer/Footer";
import styles from "./../css/rankingPage.module.css";
import dropdownBtn from "../../common/svg/dropdown_icon.svg";
import font from "../../common/css/font.module.css";
import { useNavigate } from "react-router-dom";

const RankingBox = () => {
  const dispatch = useDispatch();
  const getMyRanking = useSelector(state => state.ranking.myRanking);
  const getAllRanking = useSelector(state => state.ranking.ranking);
  const userTimeSet = Math.floor(getMyRanking.savedStudyTime / 1000);
  const myHour = parseInt(userTimeSet / 3600);
  const myMinutes = parseInt((userTimeSet % 3600) / 60);
  const [btsOn, setBtsOn] = useState(false);
  const navi = useNavigate();

  const agePick = [
    { ko: "전체 랭킹", en: "all" },
    { ko: "20대 랭킹", en: "twenty" },
    { ko: "30대 랭킹", en: "thirty" }
  ];
  const datePick = [
    { ko: "일간", en: "day" },
    { ko: "주간", en: "week" },
    { ko: "월간", en: "month" }
  ];
  const [mode, setMode] = useState("일간");
  const [ageMode, setAgeMode] = useState("전체 랭킹");

  const [type, setType] = useState({ period: "day", category: "all" });

  useEffect(() => {
    localStorage.getItem("token") === null && navi("/");
  }, []);

  useEffect(() => {
    dispatch(__getRanking(type));
  }, [type]);

  const modalOffHandler = e => {
    setBtsOn(false);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%"
        }}
      >
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
                  </div>
                );
              })}
            </div>
            <div className={styles.rankingContainer}>
              {getAllRanking.map((rankbox, i) => {
                const userTimeSet = Math.floor(rankbox.savedStudyTime / 1000);
                const hour = parseInt(userTimeSet / 3600);
                const minutes = parseInt((userTimeSet % 3600) / 60);
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
                      <div className={styles.nameBox}>
                        <span className={i > 2 ? styles.padding : styles.userRank}>
                          {i === 0 && "👑"}
                          {i === 1 && "🥈"}
                          {i === 2 && "🥉"}
                          {i + 1}
                        </span>
                        <div className={styles.userBox}>
                          <p className={`${styles.userNickname} ${font.subtitle4_600_12}`}>{rankbox.nickname}</p>
                          <p
                            className={
                              i === 0
                                ? `${styles.topUserSpec} ${font.caption2_300_10} `
                                : `${styles.userSpec} ${font.caption2_300_10} `
                            }
                          >
                            {" "}
                            {rankbox.specialty}
                          </p>
                        </div>
                      </div>
                      <div className={styles.timeBox}>
                        <span className={`${styles.userTime} ${font.subtitle4_600_12}`}>
                          <div className={styles.hour}>{hour < 10 ? "0" + hour : hour}시간 </div>
                          <div className={styles.minutes}> {minutes < 10 ? "0" + minutes : minutes}분</div>
                        </span>
                        {rankbox.studying ? (
                          <div className={i === 0 ? styles.rankerDot : styles.greendot}></div>
                        ) : (
                          <div className={styles.emptyDot}></div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div className={styles.myStatus}>
            <div className={styles.nameBox}>
              <span
                className={
                  getMyRanking.rank > 2
                    ? `${styles.padding} ${font.subtitle4_600_12}`
                    : `${styles.userRank} ${font.subtitle4_600_12}`
                }
              >
                {getMyRanking.rank === 1 && "👑"}
                {getMyRanking.rank === 2 && "🥈"}
                {getMyRanking.rank === 3 && "🥉"}
                {getMyRanking.rank ? getMyRanking.rank : "--"}
              </span>
              <div className={styles.userBox}>
                <p className={`${styles.userNickname} ${font.subtitle4_600_12}`}>{getMyRanking.nickname}</p>
                <p className={`${styles.userSpec} ${font.caption2_300_10}`}>{getMyRanking.specialty}</p>
              </div>
            </div>
            <div className={styles.timeBox}>
              <span className={`${styles.userTime} ${font.subtitle4_600_12}`}>
                {myHour < 10 ? "0" + myHour : myHour}시간 {myMinutes < 10 ? "0" + myMinutes : myMinutes}분
              </span>
              {getMyRanking.studying ? (
                <div className={styles.greendot}></div>
              ) : (
                <div className={styles.emptyDot}></div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default RankingBox;
