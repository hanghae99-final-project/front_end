import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getDailyTodo, __getTodoList } from "../../app/slice/todoSlice";
import styled from "styled-components";
import styles from "./profileTodoList.module.css";
import font from "../../common/css/font.module.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const ProfileTodoList = ({
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  selectedDate,
  setSelectedDate
}) => {
  const navi = useNavigate();

  // useEffect(() => {
  //   localStorage.getItem("token") === null && navi("/");
  // }, []);

  // 이전 달의 마지막 날 날짜와 요일 구하기
  const startDay = dayjs(`${selectedYear}-${selectedMonth}-${0}`);
  const prevDate = startDay.get("date");
  const prevDay = startDay.get("day");

  // 이번 달의 마지막날 날짜와 요일 구하기
  const endDay = dayjs(`${selectedYear}-${selectedMonth + 1}-${0}`);
  const nextDate = endDay.get("date");
  const nextDay = endDay.get("day");

  const todoList = useSelector(state => state?.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      __getDailyTodo({
        year: selectedYear,
        month: selectedMonth,
        date: selectedDate
      })
    );
  }, [selectedDate]);

  //전 날 보기 버튼
  const prevDateBtn = () => {
    if (selectedMonth === 1 && selectedDate === 1) {
      setSelectedYear(selectedYear - 1);
      setSelectedMonth(12);
      setSelectedDate(31);
    } else if (selectedDate === 1) {
      setSelectedMonth(selectedMonth - 1);
      setSelectedDate(prevDate);
    } else {
      setSelectedDate(selectedDate - 1);
    }
  };

  //다음 날 보기 버튼
  const nextDateBtn = () => {
    if (selectedMonth === 12 && selectedDate === 31) {
      setSelectedYear(selectedYear + 1);
      setSelectedMonth(1);
      setSelectedDate(1);
    } else if (selectedDate === nextDate) {
      setSelectedMonth(selectedMonth + 1);
      setSelectedDate(1);
    } else {
      setSelectedDate(selectedDate + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerWrap}>
        <div className={styles.dateBtnWarp}>
          <button className={styles.leftBtn} onClick={prevDateBtn}></button>
          <h2 className={font.caption_600_12}>
            {selectedMonth}월 {selectedDate}일
          </h2>
          <button className={styles.rightBtn} onClick={nextDateBtn}></button>
        </div>

        <ul className={styles.todoListWarp}>
          {todoList.map(todo => {
            return (
              <li className={styles.todoWarp} key={todo._id}>
                <div className={styles.toDoValueWarp}>
                  <PickColor bgColor={todo.color}></PickColor>
                  <p className={`${styles.work} ${font.caption3_300_8}`}>{todo.work}</p>
                </div>
                <button className={todo.isDone ? styles.isDoneTureBtn : styles.isDoneFalseBtn}></button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const PickColor = styled.div`
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 50%;
  margin: 0.5rem 0.5rem 0.5rem 0;
  background-color: ${props => props.bgColor};
`;

export default ProfileTodoList;
