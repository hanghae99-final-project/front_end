import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getWeeklyData } from "../../app/slice/mySlice";
import styles from "./weeklyDataGraph.module.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";
import { ReactComponent as LeftArrow } from "../../common/svg/left_arrow.svg";
import { ReactComponent as RightArrow } from "../../common/svg/right_arrow.svg";
import font from "../../common/css/font.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const WeeklyDataGraph = () => {
    const dispatch = useDispatch();

    //db에 데이터가 저장된 날짜만 불러옴(9.17, 9, 20)
    const weeklyData = useSelector((state) => state.my?.weeklyStudy);

    //불러오지 않는 날짜에 요일 채워넣기
    const addDayArray = weeklyData?.map((data) => {
        return { ...data, day: new Date(data.studyDate).getDay() };
    });
    const emptyArray = [1, 2, 3, 4, 5, 6, 0];

    //저장되지 않은 날짜에 studyTime : 0 데이터 넣기
    const weeklyStudyData = emptyArray
        .map((v) => {
            return addDayArray?.filter((item) => item.day === v);
        })
        .map((v, i) => {
            return v?.length !== 0 ? v : i + 1 === 7 ? { studyTime: 0, day: 0 } : { studyTime: 0, day: i + 1 };
        })
        .flat();
    console.log(weeklyStudyData);
    /**
     * date를 적합한 형태로 바꿔주는 함수
     * @param {string} day
     * @param {int} move default : 0, 한 주 앞으로 이동할 때 - 1, 한 주 뒤로 이동할 때 + 1
     * @returns 2022-09-18
     */
    const changeDate = (day, move) => {
        const weekToTime = 604800000;
        return new Date(new Date(date.setDate(day)).getTime() + weekToTime * move).toISOString().substring(0, 10);
    };

    const date = new Date();
    const currentDay = date.getDay();
    const monday = date.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    const sunday = monday + 6;

    const [move, setMove] = useState(0);
    const [week, setWeek] = useState({
        startWeek: changeDate(monday, move), // 이번 주 월요일 : 2022-09-19 -> ms로 바꾸고 -> 7일 ms 빼고 -> 다시 바꿔서 보내고
        endWeek: changeDate(sunday, move), // 이번 주 일요일
    });

    useEffect(() => {
        setWeek({
            startWeek: changeDate(monday, move),
            endWeek: changeDate(sunday, move),
        });
    }, [move]);

    useEffect(() => {
        dispatch(__getWeeklyData(week));
    }, [week]);

    const labels = ["월", "화", "수", "목", "금", "토", "일"];
    //ms -> hour 변환
    const data = weeklyStudyData.map((element) => Math.ceil(element?.studyTime / 3600000));
    // 16진수로 표현하여 opacity 조절
    const dataColor = data.map((element) => {
        if (element >= 1 && element < 3) {
            return (element = "#3a4941");
        } else if (element >= 3 && element < 6) {
            return (element = "#447157");
        } else if (element >= 6 && element < 9) {
            return (element = "#4d9a6d");
        } else if (element >= 9 && element < 12) {
            return (element = "#66FFA6");
        } else if (element >= 12) {
            return (element = "#ff8058");
        } else {
            //변경될 때의 색상
            return (element = "#3a4941");
        }
    });

    const options = {
        responsive: true,
        plugins: {
            labels: {
                font: {
                    size: 30,
                },
            },
        },
        hover: {
            animationDuration: 0,
        },
        maxBarThickness: 15,
        scales: {
            x: {
                grid: {
                    borderColor: "transparent",
                    display: false,
                },
                ticks: {
                    color: "white", // font color
                },
            },
            y: {
                display: false,
                min: 0,
                max: 24,
            },
        },
    };

    const chartData = {
        labels,
        datasets: [
            {
                label: "Dataset 1",
                backgroundColor: [
                    `${dataColor[0]}`,
                    `${dataColor[1]}`,
                    `${dataColor[2]}`,
                    `${dataColor[3]}`,
                    `${dataColor[4]}`,
                    `${dataColor[5]}`,
                    `${dataColor[6]}`,
                ],
                data,
                borderWidth: 0,
                borderRadius: 50,
                borderSkipped: false,
            },
        ],
    };

    return (
        <div className={styles.graph}>
            <div className={styles.aboveBox}>
                <LeftArrow
                    className={styles.arrow}
                    onClick={() => {
                        setMove((prev) => prev - 1);
                    }}
                />
                <div className={`${styles.date} ${font.caption_600_12}`}>{`${week.startWeek} - ${week.endWeek}`}</div>
                <RightArrow
                    className={styles.arrow}
                    onClick={() => {
                        setMove((prev) => prev + 1);
                    }}
                />
            </div>
            <Bar data={chartData} options={options} className={styles.graphData} />
        </div>
    );
};

export default WeeklyDataGraph;
