import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __postDday, __modifyDday } from "../../app/slice/DdaySlice";
import dayjs from "dayjs";
import styles from "./postDday.module.css";
import font from "../../common/css/font.module.css";

const PostDday = ({ blurHandler, setModifyModal, modifyMode, dataId, setOpenPost, openPostHandler }) => {
  const dispatch = useDispatch();
  const date = dayjs(); // 현재 날짜(로컬 기준) 가져오기

  const today = {
    year: date.get("year"), //오늘 연도
    month: date.get("month"), //오늘 월
    date: date.get("date"), //오늘 날짜
    day: date.get("day") //오늘 요일
  };

  const [dday, setDday] = useState({
    deadline: "",
    content: "",
    dataId
  });

  const [disabled, setDisabled] = useState(true);

  const [choiceDay, setChoiceDay] = useState("");
  const [selectedYear, setSelectedYear] = useState(today.year); //현재 선택된 연도
  const [selectedMonth, setSelectedMonth] = useState(today.month + 1); //현재 선택된 달
  const [selectedDate, setSelectedDate] = useState(today.date);

  // 이전 달의 마지막 날 날짜와 요일 구하기
  const startDay = dayjs(`${selectedYear}-${selectedMonth}-${0}`);
  const prevDate = startDay.get("date");
  const prevDay = startDay.get("day");

  // 이번 달의 마지막날 날짜와 요일 구하기
  const endDay = dayjs(`${selectedYear}-${selectedMonth + 1}-${0}`);
  const nextDate = endDay.get("date");
  const nextDay = endDay.get("day");

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

  const setDeadlineHandler = e => {
    setDday({ ...dday, deadline: e.target.id });
    setChoiceDay(e.target.id);
  };

  const setcomentHandler = e => {
    setDday({ ...dday, content: e.target.value });
  };

  useEffect(() => {
    if (dday.deadline === "" || dday.content === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [dday]);

  const modalOff = () => {
    setOpenPost(false);
    setModifyModal("");
  };

  const onSubmitHandler = e => {
    if (modifyMode) {
      e.preventDefault();
      dispatch(__modifyDday(dday));
    } else {
      e.preventDefault();
      dispatch(__postDday(dday));
      setDday({ content: "", deadline: "" });
    }
  };

  // 선택한 월에 맞는 요일 및 날짜 바인딩

  function calenderDate() {
    const data = [];
    const todayValue = dayjs(`${today.year}-${today.month + 1}-${today.date}`).format("YYYY-MM-DD");

    // 이전달
    for (let i = prevDate - prevDay; i <= prevDate; i++) {
      data.push(
        <div className={styles.dateWarp} style={{ color: "#4b4a56" }}>
          <span></span>
        </div>
      );
    }

    for (let j = 1; j <= nextDate; j++) {
      const dayValue = dayjs(`${selectedYear}-${selectedMonth}-${j}`).format("YYYY-MM-DD");

      data.push(
        <div className={styles.dateWarp}>
          <div
            className={
              choiceDay === dayValue
                ? styles.choiceDay
                : todayValue === dayValue
                ? styles.selectedToday
                : styles.dayList
            }
          >
            <span onClick={setDeadlineHandler} name="deadline" id={dayValue}>
              {j}
            </span>
          </div>
        </div>
      );
    }

    // 다음달
    for (let k = 1; k <= (7 - nextDay == 7 ? 0 : 7 - nextDay - 1); k++) {
      data.push(
        <div className={styles.dateWarp} style={{ color: "#4b4a56" }}>
          <span></span>
        </div>
      );
    }

    return data;
  }

  function calenderData() {
    const data = [];
    data.push(<div className={`${styles.dateContainer} ${font.caption2_600_10}`}> {calenderDate()} </div>);

    return data;
  }

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.touchBar}></div>
        <div className={styles.DdayTitle}>
          <h1 className={font.subtitle2_600_16}>{modifyMode ? "디데이 수정" : "디데이 추가"}</h1>
        </div>
      </div>
      <div className={styles.calenderContainer}>
        <div className={styles.innerWarp}>
          <div className={styles.dateBtnWarp}>
            <button className={styles.leftBtn} onClick={prevMonth}></button>
            <h2 className={font.caption_600_12}>
              {selectedYear}년 {selectedMonth}월
            </h2>
            <button className={styles.rightBtn} onClick={nextMonth}></button>
          </div>

          <div className={styles.calenderWrap}>
            <div className={`${styles.dayWarp} ${font.caption2_600_10}`}>
              {week.map((data, idx) => {
                return (
                  <div className={styles.day} key={idx}>
                    <span>{data}</span>
                  </div>
                );
              })}
            </div>
            {calenderData()}
          </div>
        </div>
      </div>
      <form className={styles.inputContainer} onSubmit={onSubmitHandler}>
        <h2 className={`${styles.inputTitle} ${font.subtitle2_600_16}`}>디데이 내용을 입력해주세요.</h2>
        <input
          maxLength={15}
          placeholder="내용 입력"
          className={`${styles.inputBox} ${styles.body_300_16}`}
          onChange={setcomentHandler}
          name="content"
          type="text"
          value={dday.content}
        />
        <button
          onClick={() => {
            modifyMode ? blurHandler() : openPostHandler();
          }}
          className={
            disabled ? `${styles.postBtnOff} ${font.subtitle2_600_16}` : `${styles.postBtnOn} ${font.subtitle2_600_16}`
          }
          type="subnit"
          disabled={disabled}
        >
          {modifyMode ? "수정하기" : "추가하기"}
        </button>
      </form>
    </div>
  );
};

export default PostDday;
