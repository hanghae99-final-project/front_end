import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getRanking } from "../app/slice/rankingSlice";
import styles from "../css/ranking.module.css";
import dropdownBtn from "../svg/dropdown_icon.svg";

const Ranking = () => {
  useEffect(() => {
    dispatch(__getRanking());
  }, []);

  const dispatch = useDispatch();
  const getMyRanking = useSelector((state) => state.ranking.myRanking);
  const getAllRanking = useSelector((state) => state.ranking.ranking);
  const datePick = ["일간", "주간", "월간"];
  const [mode, setMode] = useState("일간");

  // const hour = parseInt(second / 3600);
  // const minutes = parseInt((second % 3600) / 60);
  // const seconds = second % 60;
  // const msecond =

  console.log(getAllRanking);

  return (
    <div className={styles.layout}>
      <div className={styles.rankingType}>
        전체 랭킹
        <img
          className={styles.dropdownBtn}
          src={dropdownBtn}
          alt="dropdownBtn"
        />
      </div>
      <div className={styles.dateRanking}>
        {datePick.map((day, i) => {
          return (
            <div key={i}>
              {mode === day ? (
                <button
                  className={styles.button}
                  style={{
                    backgroundColor: "var(--neutral-40)",
                    color: "var(--neutral-100)",
                  }}
                  onClick={() => {
                    setMode(day);
                  }}
                >
                  {day}
                </button>
              ) : (
                <button
                  className={styles.button}
                  style={{
                    backgroundColor: "var(--neutral-30)",
                    color: "var(--neutral-70)",
                  }}
                  onClick={() => {
                    setMode(day);
                  }}
                >
                  {day}
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className={styles.rankingContainer}>
        {getAllRanking.map((rankbox, i) => {
          return (
            <div key={i}>
              <div className={styles.allStatus}>
                <span>순위</span>
                <div>
                  <p>{rankbox.nickname}</p>
                  <p>{rankbox.specialty}</p>
                </div>
                <div>
                  <span>{rankbox.savedStudyTime}</span>
                  <div>
                    {rankbox.studying ? (
                      <div className={styles.greenDot}></div>
                    ) : (
                      <div className={styles.emptyDot}></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.myStatus}>
        <span className={styles.myRank}>
          임시
          {/* {getMyRanking.rank < 100 && getMyRanking.rank > 9
            ? "0" + getMyRanking.rank
            : getMyRanking.rank < 10
            ? "00" + getMyRanking.rank
            : getMyRanking.rank} */}
        </span>
        <div className={styles.myInfo}>
          <span>한효승</span>
          <span>102시간 63분</span>
        </div>
        <div className={styles.myTime}>
          <span>20시간 12분</span>
          <span>*</span>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
