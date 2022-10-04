import React, { Fragment } from "react";
import styles from "../css/rankingPage.module.css";
import font from "../../common/css/font.module.css";

const RankingCtn = ({ i, rankbox, myStatus }) => {
  const userTimeSet = Math.floor(rankbox.savedStudyTime / 1000);
  const hour = parseInt(userTimeSet / 3600);
  const minutes = parseInt((userTimeSet % 3600) / 60);

  return (
    <>
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
              !myStatus && i === 0
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
          <div className={styles.hour}>{hour < 10 ? "0" + hour : hour}시간</div>
          <div className={styles.minutes}> {minutes < 10 ? "0" + minutes : minutes}분</div>
        </span>
        <div className={styles.dotBox}>
          {rankbox.studying ? (
            <div className={i === 0 ? styles.rankerDot : styles.greendot}></div>
          ) : (
            <div className={styles.emptyDot}></div>
          )}
        </div>
      </div>
    </>
  );
};

export default RankingCtn;
