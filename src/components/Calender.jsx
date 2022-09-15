import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMondthList } from '../app/slice/calenderSlice';
import styles from "../css/calender.module.css"


const Calender = () => {
  const dispatch = useDispatch();
  const studyData = useSelector((state) => state.calender)

  const today = {
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
    day: new Date().getDay(), //오늘 요일
  };


  const [selectedYear, setSelectedYear] = useState(today.year); //현재 선택된 연도
  const [selectedMonth, setSelectedMonth] = useState(today.month); //현재 선택된 달
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); //선택된 연도, 달의 마지막 날짜

  useEffect(() => {
    dispatch(getMondthList(selectedMonth));
  }, [selectedMonth]);

  //달력 월의 시작 요일
  const startMonth = new Date(selectedYear, selectedMonth - 1, 1);
  const calendarStartMonthData = startMonth.getDay();

  //한달 주 수
  const weekCount = Math.ceil((dateTotalCount + calendarStartMonthData) / 7)

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

  // 선택한 월 일 갯수 
  const selectMonthData = []
  for (let i = 0; i <= dateTotalCount; i++) {
    selectMonthData.push(i)
  }
  console.log(selectMonthData)

  // 선택한 월에 맞는 요일 및 날짜 바인딩
  function calenderData() {
    const data = [];
    let calenderPos = 0;
    let calenderDay = 0;

    for (let i = 0; i < weekCount; i++) {
      data.push(<tr></tr>)
      for (let i2 = 0; i2 < 7; i2++) {
        let dayValue = new Date(selectedYear, selectedMonth - 1, calenderDay + 2).toISOString().split("T")[0];
        let ifValue = studyData.map(data => data.studyDate).includes(dayValue) && studyData.filter(data => data.studyDate === dayValue)[0].studyTime
        let hours = 3600000

        if (studyData.map(data => data.studyDate).includes(dayValue) === false) {
          data.push(
            <td style={{ backgroundColor: "white" }}>
              {calendarStartMonthData <= calenderPos && calenderDay < dateTotalCount ?
                (calenderDay++, <span value={dayValue}>{calenderDay}</span>) : ""}
            </td>
          )
        } else if (ifValue < hours * 3) {
          data.push(
            <td style={{ backgroundColor: "blue" }}>
              {calendarStartMonthData <= calenderPos && calenderDay < dateTotalCount ?
                (calenderDay++, <span value={dayValue}>{calenderDay}</span>) : ""}
            </td>
          )
        } else if (ifValue >= hours * 3 && ifValue < hours * 6) {
          data.push(
            <td style={{ backgroundColor: "green" }}>
              {calendarStartMonthData <= calenderPos && calenderDay < dateTotalCount ?
                (calenderDay++, <span value={dayValue}>{calenderDay}</span>) : ""}
            </td>
          )
        } else if (ifValue >= hours * 6 && ifValue < hours * 9) {
          data.push(
            <td style={{ backgroundColor: "black" }}>
              {calendarStartMonthData <= calenderPos && calenderDay < dateTotalCount ?
                (calenderDay++, <span value={dayValue}>{calenderDay}</span>) : ""}
            </td>
          )
        } else if (ifValue >= hours * 9 && ifValue < hours * 12) {
          data.push(
            <td style={{ backgroundColor: "red" }} >{
              calendarStartMonthData <= calenderPos && calenderDay < dateTotalCount ?
                (calenderDay++, <span value={dayValue}>{calenderDay}</span>) : ""}
            </td>
          )
        } else {
          data.push(
            <td style={{ backgroundColor: "gray" }}>{
              calendarStartMonthData <= calenderPos && calenderDay < dateTotalCount ?
                (calenderDay++, <span value={dayValue}>{calenderDay}</span>) : ""}
            </td>
          )
        }
        calenderPos++;
      }
    }
    return data
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={prevMonth}>◀︎</button>
        <h1>{selectedYear}, {selectedMonth}</h1>
        <button onClick={nextMonth}>►</button>
      </div>
      <table className={styles.weekWrap}>
        <tbody>
          <tr>
            {week.map((data, idx) => {
              return (
                <td key={idx}>
                  <span>
                    {data}
                  </span>
                </td>)
            })}
          </tr>
          {calenderData()}
        </tbody>
      </table>
    </div>
  );
};

export default Calender;