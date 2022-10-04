import React, { useState } from "react";
import Calender from "../../components/calender/Calender";
import ProfileTodoList from "../../components/profile/ProfileTodoList";
import styles from "./contentsBox.module.css";
import dayjs from "dayjs";

const ContentsBox = () => {
  // 날짜 정보 가져오기
  const date = dayjs(); // 현재 날짜(로컬 기준) 가져오기

  const today = {
    year: date.get("year"), //오늘 연도
    month: date.get("month"), //오늘 월
    date: date.get("date"), //오늘 날짜
    day: date.get("day") //오늘 요일
  };

  const [selectedYear, setSelectedYear] = useState(today.year); //현재 선택된 연도
  const [selectedMonth, setSelectedMonth] = useState(today.month + 1); //현재 선택된 달
  const [selectedDate, setSelectedDate] = useState(today.date);

  return (
    <div className={styles.contentsBox}>
      <Calender
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ProfileTodoList
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default ContentsBox;
