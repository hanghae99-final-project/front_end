import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dailyTodo } from "../../app/slice/toDoSlice";
import styled from "styled-components";
import styles from "./profileTodoList.module.css";
import font from "../../common/css/common.module.css";

const ProfileTodoList = () => {
    const today = {
        year: new Date().getFullYear(), //오늘 연도
        month: new Date().getMonth() + 1, //오늘 월
        date: new Date().getDate(), //오늘 날짜
        day: new Date().getDay(), //오늘 요일
    };

    const [selectedDate, setSelectedDate] = useState(today.date); //
    const [selectedYear, setSelectedYear] = useState(today.year); //현재 선택된 연도
    const [selectedMonth, setSelectedMonth] = useState(today.month); //현재 선택된 달
    const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); //선택된 연도, 달의 마지막 날짜

    console.log(today.year, today.month, today.date);

    // 선택한 월 일 갯수
    const selectMonthData = [];
    for (let i = 0; i <= dateTotalCount; i++) {
        selectMonthData.push(i);
    }

    console.log(selectMonthData);

    const todos = useSelector((state) => state.toDo);
    console.log(todos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            dailyTodo({
                year: selectedYear,
                month: selectedMonth,
                date: selectedDate,
            })
        );
    }, [selectedDate]);

    //전 날 보기 버튼
    const prevDate = useCallback(() => {
        if (selectedDate === 1) {
            setSelectedMonth(selectedMonth - 1);
            setSelectedDate(selectMonthData[selectMonthData.length - 1]);
            console.log(selectedMonth);
        } else {
            setSelectedDate(selectedDate - 1);
        }
    }, [selectedDate]);

    //다음 날 보기 버튼
    const nextDate = useCallback(() => {
        if (selectedDate === selectMonthData[selectMonthData.length - 1]) {
            setSelectedMonth(selectedMonth + 1);
            setSelectedDate(1);
        } else {
            setSelectedDate(selectedDate + 1);
        }
    }, [selectedDate]);

    return (
        <div className={styles.container}>
            <div className={styles.innerWrap}>
                <div className={styles.dateBtnWarp}>
                    <button className={styles.leftBtn} onClick={prevDate}></button>
                    <h2 className={font.caption_600_12}>
                        {selectedMonth}월 {selectedDate}일
                    </h2>
                    <button className={styles.rightBtn} onClick={nextDate}></button>
                </div>

                <ul className={styles.todoListWarp}>
                    {todos.map((toDo) => {
                        console.log(toDo);
                        return (
                            <li className={styles.todoWarp}>
                                <div className={styles.toDoValueWarp}>
                                    <PickColor bgColor={toDo.color}></PickColor>
                                    <p className={`${styles.work} ${font.caption3_300_8}`}>{toDo.work}</p>
                                </div>
                                <button className={toDo.isDone ? styles.isDoneTureBtn : styles.isDoneFalseBtn}></button>
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
    background-color: ${(props) => props.bgColor};
`;

export default ProfileTodoList;
