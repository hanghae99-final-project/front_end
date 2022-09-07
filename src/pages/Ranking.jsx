import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getRanking } from "../app/slice/rankingSlice";
import styles from "../css/ranking.module.css";
import styled from "styled-components";

const Ranking = () => {
  const dispatch = useDispatch();
  const getRanking = useSelector((state) => state.ranking);
  const datePick = ["일간", "주간", "월간"];
  const [mode, setMode] = useState("일간");
  const [btSheet, setBtSheet] = useState("");

  useEffect(() => {
    dispatch(__getRanking());
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.rankingType}>전체 랭킹 🔻</div>
      <div className={styles.dateRanking}>
        {datePick.map((day, i) => {
          return (
            <div key={i}>
              {mode === day ? (
                <Button
                  style={{ backgroundColor: "white" }}
                  onClick={() => {
                    setMode(day);
                  }}
                >
                  {day}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setMode(day);
                  }}
                >
                  {day}
                </Button>
              )}
            </div>
          );
        })}
      </div>
      <div className={styles.myStatus}>
        <span className={styles.myRank}>001</span>
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

const Button = styled.button`
  background-color: #cdcdcd;
  width: 9.2rem;
  height: 1.5rem;
  display: flex;
  border: none;
  border-radius: 1rem;
  margin: 0.33rem 0.1rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
`;
