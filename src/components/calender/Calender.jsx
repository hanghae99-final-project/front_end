import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMonthList } from "../../app/slice/calenderSlice";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import styles from "./calender.module.css";
import font from "../../common/css/common.module.css";

const Calender = ({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  selectedDate,
  setselectedDate
}) => {
  const dispatch = useDispatch();
  const navi = useNavigate();
  const studyData = useSelector(state => state.calender);

  // 이전 달의 마지막 날 날짜와 요일 구하기
  const startDay = dayjs(`${selectedYear}-${selectedMonth}-${0}`);
  const prevDate = startDay.get("date");
  const prevDay = startDay.get("day");

  // 이번 달의 마지막날 날짜와 요일 구하기
  const endDay = dayjs(`${selectedYear}-${selectedMonth + 1}-${0}`);
  const nextDate = endDay.get("date");
  const nextDay = endDay.get("day");
  console.log(endDay.format("YY - MM - DD"), nextDate, nextDay);

  useEffect(() => {
    localStorage.getItem("token") === null && navi("/");
  }, []);

  useEffect(() => {
    dispatch(getMonthList({ selectedYear, selectedMonth }));
  }, [selectedMonth]);

  //일주일
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  //이전 달 보기 버튼
  const prevMonth = useCallback(() => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }, [selectedMonth]);

  //다음 달 보기 버튼
  const nextMonth = useCallback(() => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }, [selectedMonth]);

  // 선택한 월에 맞는 요일 및 날짜 바인딩
  function calenderDate() {
    const data = [];
    let todayValue = dayjs(`${selectedYear}-${selectedMonth}-${selectedDate}`).format("YYYY-MM-DD");
    console.log(todayValue); /* new Date(today.year, today.month - 1, today.date + 1).toISOString().split("T")[0]; */

    // 이전달
    for (var i = prevDate - prevDay; i <= prevDate; i++) {
      data.push(
        <div className={styles.dateWarp} style={{ backgroundColor: "#3b3b44" }}>
          <span>{i}</span>
        </div>
      );
    }

    // 이번달
    for (var j = 1; j <= nextDate; j++) {
      const dayValue = dayjs(`${selectedYear}-${selectedMonth}-${j}`).format("YYYY-MM-DD");
      const ifValue =
        studyData.map(data => data.studyDate).includes(dayValue) &&
        studyData.filter(data => data.studyDate === dayValue)[0].studyTime;
      const hours = 3600000;

      data.push(
        <div
          className={todayValue === dayValue ? `${styles.dateWarp} ${styles.selectedToday}` : styles.dateWarp}
          style={
            studyData.map(data => data.studyDate).includes(dayValue) === false
              ? { backgroundColor: "#4b4a56" }
              : ifValue < hours * 3
              ? { backgroundColor: "#3a4940" }
              : ifValue >= hours * 3 && ifValue < hours * 6
              ? { backgroundColor: "#4e9a6e" }
              : ifValue >= hours * 6 && ifValue < hours * 9
              ? { backgroundColor: "#4e9a6e" }
              : ifValue >= hours * 9 && ifValue < hours * 12
              ? { backgroundColor: "#66ffa6" }
              : { backgroundColor: "#ff8058" }
          }
        >
          <span value={dayValue}>{j}</span>
        </div>
      );
    }

    // 다음달
    for (var k = 1; k <= (7 - nextDay == 7 ? 0 : 7 - nextDay); k++) {
      data.push(
        <div className={styles.dateWarp} style={{ backgroundColor: "#3b3b44" }}>
          <span>{k}</span>
        </div>
      );
    }
    return data;
  }

  function calenderData() {
    const data = [];
    data.push(<div className={styles.dateContainer}> {calenderDate()} </div>);

    return data;
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerWarp}>
        <div className={styles.dateBtnWarp}>
          <button className={styles.leftBtn} onClick={prevMonth}></button>
          <h2 className={font.caption_600_12}>
            {selectedYear}년 {selectedMonth}월
          </h2>
          <button className={styles.rightBtn} onClick={nextMonth}></button>
        </div>

        <div className={styles.weekWrap}>
          <div className={styles.dayWarp}>
            {week.map((data, idx) => {
              return (
                <div className={`${styles.day} ${font.caption3_600_8}`} key={idx}>
                  <span>{data}</span>
                </div>
              );
            })}
          </div>
          {calenderData()}
        </div>
      </div>
    </div>
  );
};

export default Calender;
