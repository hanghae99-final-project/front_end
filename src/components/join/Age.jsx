import React from "react";
import styles from "./join.module.css";
import arrowBtn2 from "../../common/svg/arrowback_icon2.svg";
import check from "../../common/svg/check_icon.svg";
import font from "../../common/css/font.module.css";

const Age = ({ setMode, setUserInfo, userInfo }) => {
  const pickAge = ["20대", "30대", "기타"];

  console.log(userInfo.ageGroup);
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <button className={styles.arrowBack} onClick={() => setMode("Nickname")} src={arrowBtn2} alt="arrowBtn2" />
        <p className={`${styles.infoText} ${font.header3_600_24}`}>
          현재 연령대를
          <br />
          선택해주세요
        </p>
        <div>
          {pickAge.map((pick, i) => {
            return (
              <div key={i}>
                {userInfo.ageGroup === pick ? (
                  <button
                    className={`${styles.agePickBtn} ${font.subtitle2_600_16}`}
                    onClick={() => {
                      setUserInfo({ ...userInfo, ageGroup: pick });
                    }}
                  >
                    <img src={check} alt="check" />
                    {pick}
                  </button>
                ) : (
                  <button
                    className={
                      userInfo.ageGroup === ""
                        ? `${styles.ageBase} ${font.subtitle2_600_16}`
                        : `${styles.ageAfter} ${font.subtitle2_600_16}`
                    }
                    onClick={() => {
                      setUserInfo({ ...userInfo, ageGroup: pick });
                    }}
                  >
                    {pick}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {userInfo.ageGroup === "" ? (
        <button className={`${styles.ageBtnNo} ${font.subtitle2_600_16}`} disabled>
          확인
        </button>
      ) : (
        <button className={`${styles.ageBtnYes} ${font.subtitle2_600_16}`} onClick={() => setMode("Specialty")}>
          확인
        </button>
      )}
    </div>
  );
};

export default Age;
