import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getWeeklyData } from "../../app/slice/mySlice";
import styles from "./weeklyDataGraph.module.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import { ReactComponent as LeftArrow } from "../../common/svg/left_arrow.svg";
import { ReactComponent as RightArrow } from "../../common/svg/right_arrow.svg";
import font from "../../common/css/font.module.css";
import useFindWeek from "../../hooks/useFindWeek";
import useGetWeeklyData from "../../hooks/useGetWeeklyData";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const WeeklyDataGraph = () => {
  const dispatch = useDispatch();

  const weeklyStudyData = useGetWeeklyData();

  const [monday, sunday, setMove] = useFindWeek();

  useEffect(() => {
    dispatch(__getWeeklyData({ startWeek: monday, endWeek: sunday }));
  }, [monday]);

  const labels = ["월", "화", "수", "목", "금", "토", "일"];

  //ms -> hour 변환
  const data = weeklyStudyData.map(element => Math.floor(element.studyTime / 3600000));

  //시간별 색상 적용
  const dataColor = data.map(element => {
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
          size: 30
        }
      }
    },
    hover: {
      animationDuration: 0
    },
    maxBarThickness: 15,
    scales: {
      x: {
        grid: {
          borderColor: "transparent",
          display: false
        },
        ticks: {
          color: "white" // font color
        }
      },
      y: {
        display: false,
        min: 0,
        max: 24
      }
    }
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
          `${dataColor[6]}`
        ],
        data,
        borderWidth: 0,
        borderRadius: 50,
        borderSkipped: false
      }
    ]
  };

  return (
    <div className={styles.graph}>
      <div className={styles.aboveBox}>
        <LeftArrow
          className={styles.arrow}
          onClick={() => {
            setMove(prev => prev - 1);
          }}
        />
        <div className={`${styles.date} ${font.caption_600_12}`}>{`${monday} - ${sunday}`}</div>
        <RightArrow
          className={styles.arrow}
          onClick={() => {
            setMove(prev => prev + 1);
          }}
        />
      </div>
      <Bar data={chartData} options={options} className={styles.graphData} />
    </div>
  );
};

export default WeeklyDataGraph;
