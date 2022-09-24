import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMonthList } from "../../app/slice/calenderSlice";
import styles from "./calender.module.css";
import font from "../../common/css/common.module.css";

const Calender = () => {
    const dispatch = useDispatch();
    const studyData = useSelector((state) => state.calender);

    const today = {
        year: new Date().getFullYear(), //오늘 연도
        month: new Date().getMonth() + 1, //오늘 월
        date: new Date().getDate(), //오늘 날짜
        day: new Date().getDay(), //오늘 요일
    };

    console.log(today.month, today.date);

    const [selectedYear, setSelectedYear] = useState(today.year); //현재 선택된 연도
    const [selectedMonth, setSelectedMonth] = useState(today.month); //현재 선택된 달
    const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); //선택된 연도, 달의 마지막 날짜

    useEffect(() => {
        dispatch(getMonthList({ selectedYear, selectedMonth }));
    }, [selectedMonth]);

    //달력 월의 시작 요일
    const startMonth = new Date(selectedYear, selectedMonth - 1, 1);
    const calendarStartMonthData = startMonth.getDay();

    //한달 주 수
    const weekCount = Math.ceil((dateTotalCount + calendarStartMonthData) / 7);

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
    const selectMonthData = [];
    for (let i = 0; i <= dateTotalCount; i++) {
        selectMonthData.push(i);
    }
    console.log(selectMonthData);

    // 선택한 월에 맞는 요일 및 날짜 바인딩

    function calenderDate() {
        const data = [];
        let calenderPos = 0;
        let calenderDay = 0;
        let todayValue = new Date(today.year, today.month - 1, today.date + 1).toISOString().split("T")[0];

        for (let i = 0; i < weekCount; i++) {
            for (let i2 = 0; i2 < 7; i2++) {
                let dayValue = new Date(selectedYear, selectedMonth - 1, calenderDay + 2).toISOString().split("T")[0];

                let ifValue =
                    studyData.map((data) => data.studyDate).includes(dayValue) && studyData.filter((data) => data.studyDate === dayValue)[0].studyTime;
                let hours = 3600000;

                /* if (todayValue === dayValue) {
          data.push(
            <div
              className={styles.dateWarp}
              style={{ backgroundColor: "0 0 0 3px, red, inset;" }}
            >
              {calendarStartMonthData <= calenderPos &&
              calenderDay < dateTotalCount
                ? (calenderDay++, (<span value={dayValue}>{calenderDay}</span>))
                : ""}
            </div>
          );
        } else  */
                if (studyData.map((data) => data.studyDate).includes(dayValue) === false) {
                    data.push(
                        <div
                            className={todayValue === dayValue ? `${styles.dateWarp} ${styles.selectedToday}` : styles.dateWarp}
                            style={{ backgroundColor: "#4b4a56" }}
                        >
                            {calendarStartMonthData <= calenderPos && calenderDay < dateTotalCount
                                ? (calenderDay++, (<span value={dayValue}>{calenderDay}</span>))
                                : ""}
                        </div>
                    );
                } else if (ifValue < hours * 3) {
                    data.push(
                        <div
                            className={todayValue === dayValue ? `${styles.dateWarp} ${styles.selectedToday}` : styles.dateWarp}
                            style={{ backgroundColor: "#3a4940" }}
                        >
                            {calendarStartMonthData <= calenderPos && calenderDay < dateTotalCount
                                ? (calenderDay++, (<span value={dayValue}>{calenderDay}</span>))
                                : ""}
                        </div>
                    );
                } else if (ifValue >= hours * 3 && ifValue < hours * 6) {
                    data.push(
                        <div
                            className={todayValue === dayValue ? `${styles.dateWarp} ${styles.selectedToday}` : styles.dateWarp}
                            style={{ backgroundColor: "#447257" }}
                        >
                            {calendarStartMonthData <= calenderPos && calenderDay < dateTotalCount
                                ? (calenderDay++, (<span value={dayValue}>{calenderDay}</span>))
                                : ""}
                        </div>
                    );
                } else if (ifValue >= hours * 6 && ifValue < hours * 9) {
                    data.push(
                        <div
                            className={todayValue === dayValue ? `${styles.dateWarp} ${styles.selectedToday}` : styles.dateWarp}
                            style={{ backgroundColor: "#4e9a6e" }}
                        >
                            {calendarStartMonthData <= calenderPos && calenderDay < dateTotalCount
                                ? (calenderDay++, (<span value={dayValue}>{calenderDay}</span>))
                                : ""}
                        </div>
                    );
                } else if (ifValue >= hours * 9 && ifValue < hours * 12) {
                    data.push(
                        <div
                            className={todayValue === dayValue ? `${styles.dateWarp} ${styles.selectedToday}` : styles.dateWarp}
                            style={{ backgroundColor: "#66ffa6" }}
                        >
                            {calendarStartMonthData <= calenderPos && calenderDay < dateTotalCount
                                ? (calenderDay++, (<span value={dayValue}>{calenderDay}</span>))
                                : ""}
                        </div>
                    );
                } else {
                    data.push(
                        <div
                            className={todayValue === dayValue ? `${styles.dateWarp} ${styles.selectedToday}` : styles.dateWarp}
                            style={{ backgroundColor: "#ff8058" }}
                        >
                            {calendarStartMonthData <= calenderPos && calenderDay < dateTotalCount
                                ? (calenderDay++, (<span value={dayValue}>{calenderDay}</span>))
                                : ""}
                        </div>
                    );
                }
                calenderPos++;
            }
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
                            console.log(data);
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
