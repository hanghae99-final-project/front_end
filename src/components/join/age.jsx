import React, { useState } from "react";
import styles from "./joincss/join.module.css";

const Age = ({ setMode, setUserInfo, userInfo }) => {
  const pickAge = ["20대", "30대", "기타"];
  console.log(userInfo);
  return (
    <div>
      <p>나의 연령대</p>
      <div>
        {pickAge.map((pick, i) => {
          return (
            <div key={i}>
              {userInfo.ageGroup === pick ? (
                <button
                  style={{ backgroundColor: "#2d2d2d", color: "white" }}
                  onClick={() => {
                    setUserInfo({ ...userInfo, ageGroup: pick });
                  }}
                >
                  {pick}
                </button>
              ) : (
                <button
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
      {userInfo.age === "" ? (
        <button disabled className={styles.joinBtn}>
          확인
        </button>
      ) : (
        <button className={styles.joinBtn} onClick={() => setMode("Specialty")}>
          확인
        </button>
      )}
    </div>
  );
};

export default Age;
