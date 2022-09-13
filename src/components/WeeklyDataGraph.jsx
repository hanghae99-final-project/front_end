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

    const date = new Date();
    const currentDay = date.getDay();
    const monday = date.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
    const mondayDate = new Date(date.setDate(monday)).toISOString().substring(0, 10);
    const sunday = monday + 6;
    const sundayDate = new Date(date.setDate(sunday)).toISOString().substring(0, 10);

    const [week, setWeek] = useState({
        startWeek: mondayDate,
        endWeek: sundayDate,
    });

    // return new Date(date.setDate(sunday)).toISOString().substring(0, 10);

    useEffect(() => {
        dispatch(
            __getWeeklyData({
                startWeek: mondayDate,
                endWeek: sundayDate,
            })
        );
    }, []);
    console.log(week);

    const weeklyData = useSelector((state) => state.my);
    const labels = weeklyData.map((element) => element.day);
    const data = weeklyData.map((element) => element.time);
    // 16진수로 표현하여 opacity 조절
    const dataColor = weeklyData.map((element) => Math.ceil((element.time / 24) * 256).toString(16));

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

    useEffect(() => {
        dispatch(__getWeeklyData());
    }, []);

    return (
        <div className={styles.graph}>
            <div style={{ display: 'flex' }}>
                <button>왼쪽</button>
                <div>{`${monday} - ${sunday}`}</div>
                <button>오른쪽</button>
            </div>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default WeeklyDataGraph;
