import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getRanking } from '../app/slice/rankingSlice';
import styles from '../css/ranking.module.css';
import dropdownBtn from '../svg/dropdown_icon.svg';

const Ranking = () => {
    const dispatch = useDispatch();
    const getMyRanking = useSelector((state) => state.ranking.myRanking);
    const getAllRanking = useSelector((state) => state.ranking.ranking);
    const userTimeSet = Math.floor(getMyRanking.savedStudyTime / 1000);
    const myHour = parseInt(userTimeSet / 3600);
    const myMinutes = parseInt((userTimeSet % 3600) / 60);
    const [showSheet, setShowSheet] = useState(false);
    const datePick = [
        { ko: '일간', en: 'day' },
        { ko: '주간', en: 'week' },
        { ko: '월간', en: 'month' },
    ];
    const [mode, setMode] = useState('일간');

    const [type, setType] = useState({ period: 'day', category: 'all' });
    console.log(type);

    useEffect(() => {
        dispatch(__getRanking(type));
    }, [type]);

    return (
        <div className={styles.layout}>
            <div className={styles.rankingType}>
                전체 랭킹
                <button className={styles.dropdownBtn}>
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
                                        backgroundColor: 'var(--neutral-40)',
                                        color: 'var(--neutral-100)',
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
                                        backgroundColor: 'var(--neutral-30)',
                                        color: 'var(--neutral-70)',
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
                            <div className={styles.allStatus}>
                                <span className={styles.userRank}>{i + 1}</span>
                                <div className={styles.userBox}>
                                    <p className={styles.userNickname}>{rankbox.nickname}</p>
                                    <p className={styles.userSpec}> {rankbox.specialty}</p>
                                </div>
                                <div className={styles.timeBox}>
                                    <span className={styles.userTime}>
                                        {/* <span>
                    {target.hour < 10 ? "0" + target.hour : target.hour}:
                  </span>
                  <span>
                    {target.minute < 10 ? "0" + target.minute : target.minute}:
                  </span> */}
                                        {hour < 10 ? '0' + hour : hour}시간 {minutes < 10 ? '0' + minutes : minutes}분
                                    </span>
                                    {rankbox.studying ? <div className={styles.greendot}></div> : <div className={styles.emptyDot}></div>}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles.myStatus}>
                <span className={styles.userRank}>{getMyRanking.rank}</span>
                <div className={styles.userBox}>
                    <p className={styles.userNickname}>{getMyRanking.nickname}</p>
                    <p className={styles.userSpec}>{getMyRanking.specialty}</p>
                </div>
                <div className={styles.timeBox}>
                    <span className={styles.userTime}>
                        {myHour < 10 ? '0' + myHour : myHour}시간 {myMinutes < 10 ? '0' + myMinutes : myMinutes}분
                    </span>
                    {getMyRanking.studying ? <div className={styles.greendot}></div> : <div className={styles.emptyDot}></div>}
                </div>
            </div>
        </div>
    );
};

export default Ranking;
