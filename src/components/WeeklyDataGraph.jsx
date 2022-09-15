import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getWeeklyData } from '../app/slice/mySlice';
import styles from '../css/weeklyDataGraph.module.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const WeeklyDataGraph = () => {
    const dispatch = useDispatch();

    const weeklyData = useSelector((state) => state.my?.weeklyStudy);
    const addDayArray = weeklyData?.map((data) => {
        return { ...data, day: new Date(data.studyDate).getDay() };
    });
    const emptyArray = [1, 2, 3, 4, 5, 6, 0];
    const weeklyStudyData = emptyArray
        .map((v) => {
            return addDayArray?.filter((item) => item.day === v);
        })
        .map((v, i) => {
            return v?.length !== 0 ? v : i + 1 === 7 ? { studyTime: 0, day: 0 } : { studyTime: 0, day: i + 1 };
        })
        .flat();
    console.log(weeklyStudyData);
    const nowMonth = new Date().getMonth();

    const changeDate = (day) => {
        return new Date(date.setDate(day)).toISOString().substring(0, 10);
    };
    const date = new Date();
    const currentDay = date.getDay();
    const monday = date.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    const mondayDate = changeDate(monday);
    const sunday = monday + 6;
    const sundayDate = changeDate(sunday);
    console.log(monday, mondayDate, sunday, sundayDate);

    const [week, setWeek] = useState({
        startWeek: mondayDate,
        endWeek: sundayDate,
    });
    console.log(week);

    useEffect(() => {
        dispatch(__getWeeklyData(week));
    }, [week]);

    const labels = ['월', '화', '수', '목', '금', '토', '일'];
    //ms -> hour 변환
    const data = weeklyStudyData.map((element) => Math.floor(element?.studyTime / 3600000));
    console.log(data);
    // 16진수로 표현하여 opacity 조절
    const dataColor = data.map((element) => Math.ceil((element / 24) * 256).toString(16));
    console.log(dataColor);

    const options = {
        responsive: true,
        plugins: {
            labels: {
                font: {
                    size: 30,
                },
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
        maxBarThickness: 20,
        scales: {
            x: {
                grid: {
                    borderColor: 'transparent',
                    display: false,
                },
                ticks: {
                    color: 'white', // font color
                },
            },
            y: {
                display: false,
            },
        },
    };

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                backgroundColor: [
                    `#25c137${dataColor[0]}`,
                    `#25c137${dataColor[1]}`,
                    `#25c137${dataColor[2]}`,
                    `#25c137${dataColor[3]}`,
                    `#25c137${dataColor[4]}`,
                    `#25c137${dataColor[5]}`,
                    `#25c137${dataColor[6]}`,
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
            <div style={{ display: 'flex' }}>
                <button
                    onClick={() => {
                        setWeek(
                            (prev) =>
                                (prev = {
                                    startWeek: changeDate(new Date(prev.startWeek).getDate() - 7),
                                    endWeek: changeDate(new Date(prev.endWeek).getDate() - 7),
                                })
                        );
                    }}>
                    왼쪽
                </button>
                <div>{`${mondayDate} - ${sundayDate}`}</div>
                <button>오른쪽</button>
            </div>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default WeeklyDataGraph;
