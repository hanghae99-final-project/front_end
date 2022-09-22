import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getRanking } from "../app/slice/rankingSlice";
import Footer from "../components/footer/Footer";
import Layout from "../layout/Layout";
import styles from "./css/rankingPage.module.css";
import dropdownBtn from "../common/svg/dropdown_icon.svg";
import check from "../common/svg/check_icon.svg";

const Ranking = () => {
    const dispatch = useDispatch();
    const getMyRanking = useSelector((state) => state.ranking.myRanking);
    const getAllRanking = useSelector((state) => state.ranking.ranking);
    const userTimeSet = Math.floor(getMyRanking.savedStudyTime / 1000);
    const myHour = parseInt(userTimeSet / 3600);
    const myMinutes = parseInt((userTimeSet % 3600) / 60);
    const [showSheet, setShowSheet] = useState(false);
    const [btsOn, setBtsOn] = useState(false);
    const agePick = [
        { ko: "전체 랭킹", en: "all" },
        { ko: "20대 랭킹", en: "twenty" },
        { ko: "30대 랭킹", en: "thirty" },
    ];
    const datePick = [
        { ko: "일간", en: "day" },
        { ko: "주간", en: "week" },
        { ko: "월간", en: "month" },
    ];
    const [mode, setMode] = useState("일간");
    const [ageMode, setAgeMode] = useState("전체 랭킹");

    const [type, setType] = useState({ period: "day", category: "all" });
    console.log(type);

    useEffect(() => {
        dispatch(__getRanking(type));
    }, [type]);

    const modalOffHandler = (e) => {
        setBtsOn(false);
    };

    return (
        <Layout>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                }}>
                <div>
                    <div className={btsOn ? styles.blurIn : styles.blurOut} onClick={modalOffHandler}>
                        <div className={styles.rankingType}>
                            {ageMode}
                            <button
                                className={styles.dropdownBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setBtsOn(!btsOn);
                                }}>
                                <img src={dropdownBtn} alt='dropdownBtn' />
                            </button>
                        </div>
                        <div className={styles.dateRanking}>
                            {datePick.map((day, i) => {
                                return (
                                    <div key={i}>
                                        {mode === day.ko ? (
                                            <button
                                                className={styles.button}
                                                style={{
                                                    backgroundColor: "var(--neutral-40)",
                                                    color: "var(--neutral-100)",
                                                }}
                                                onClick={() => {
                                                    setMode(day.ko);
                                                    setType({ ...type, period: day.en });
                                                }}>
                                                {day.ko}
                                            </button>
                                        ) : (
                                            <button
                                                className={styles.button}
                                                style={{
                                                    backgroundColor: "var(--neutral-30)",
                                                    color: "var(--neutral-70)",
                                                }}
                                                onClick={() => {
                                                    setType({ ...type, period: day.en });
                                                    setMode(day.ko);
                                                }}>
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
                                        <div className={i === 0 ? styles.topRanker : i === 1 || i === 2 ? styles.otherRanker : styles.allStatus}>
                                            <span className={i > 2 ? styles.padding : styles.userRank}>
                                                {i === 0 && "👑"}
                                                {i === 1 && "🥈"}
                                                {i === 2 && "🥉"}
                                                {i + 1}
                                            </span>
                                            <div className={styles.userBox}>
                                                <p className={styles.userNickname}>{rankbox.nickname}</p>
                                                <p className={styles.userSpec}> {rankbox.specialty}</p>
                                            </div>
                                            <div className={styles.timeBox}>
                                                <span className={styles.userTime}>
                                                    {hour < 10 ? "0" + hour : hour}시간 {minutes < 10 ? "0" + minutes : minutes}분
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
                        <span className={getMyRanking.rank < 4 ? styles.myPadding : styles.padding}>
                            {getMyRanking.rank === 1 && "👑"}
                            {getMyRanking.rank === 2 && "🥈"}
                            {getMyRanking.rank === 3 && "🥉"}
                            {getMyRanking.rank === 0 ? "--" : getMyRanking.rank}
                        </span>
                        <div className={styles.userBox}>
                            <p className={styles.userNickname}>{getMyRanking.nickname}</p>
                            <p className={styles.userSpec}>{getMyRanking.specialty}</p>
                        </div>
                        <div className={styles.timeBox}>
                            <span className={styles.userTime}>
                                {myHour < 10 ? "0" + myHour : myHour}시간 {myMinutes < 10 ? "0" + myMinutes : myMinutes}분
                            </span>
                            {getMyRanking.studying ? <div className={styles.greendot}></div> : <div className={styles.emptyDot}></div>}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
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
                                    }}>
                                    {age.ko}
                                    <img src={check} alt='check' />
                                </button>
                            ) : (
                                <button
                                    className={styles.ageChoice}
                                    style={{ color: "#7E7C8C" }}
                                    onClick={() => {
                                        setType({ ...type, category: age.en });
                                        setAgeMode(age.ko);
                                    }}>
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
