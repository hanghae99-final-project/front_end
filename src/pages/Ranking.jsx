import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getRanking } from "../app/slice/rankingSlice";
import Layout from "../layout/Layout";
import styles from "./css/rankingPage.module.css";
import check from "../common/svg/check_icon.svg";
import { useNavigate } from "react-router-dom";
import RankingBox from "./Ranking/RankingBox";

const Ranking = () => {
  const dispatch = useDispatch();
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
    <Layout>
      <RankingBox
        btsOn={btsOn}
        setBtsOn={setBtsOn}
        ageMode={ageMode}
        setAgeMode={setAgeMode}
        type={type}
        setType={setType}
      />
      <div className={btsOn ? styles.btsOn : styles.btsOff}>
        {agePick.map((age, i) => {
          return (
            <div key={i} className={styles.btsWrap}>
              {ageMode === age.ko ? (
                <button
                  className={styles.ageChoice}
                  style={{ color: "#ffffff" }}
                  onClick={() => {
                    setAgeMode(age.ko);
                    setType({ ...type, category: age.en });
                  }}
                >
                  {age.ko}
                  <img src={check} alt="check" />
                </button>
              ) : (
                <button
                  className={styles.ageChoice}
                  style={{ color: "#7E7C8C" }}
                  onClick={() => {
                    setType({ ...type, category: age.en });
                    setAgeMode(age.ko);
                    setBtsOn(false);
                  }}
                >
                  {age.ko}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Ranking;
