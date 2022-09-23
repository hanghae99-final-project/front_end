import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getDday } from "../../app/slice/DdaySlice";
import styles from "./mainDday.module.css";
import font from "../../common/css/font.module.css";
import { Link } from "react-router-dom";

const MainDday = () => {
    const dispatch = useDispatch();
    const dDay = useSelector((state) => state?.dDay.myDday);
    const today = new Date();
    const targetDay = new Date(dDay && dDay[0].deadline);
    const remainDay = Math.floor((targetDay - today) / 1000 / 3600 / 24);

    useEffect(() => {
        dispatch(__getDday());
    }, []);

    return (
        <div className={styles.dayBox}>
            {dDay === undefined ? (
                <Link to="/dday">
                    <span className={`${styles.text} ${font.subtitle3_300_14}`}>디데이를 추가해 보세요</span>
                </Link>
            ) : (
                <>
                    <span className={`${styles.day} ${font.subtitle3_600_14}`}>D{remainDay}</span>
                    <span className={`${styles.text} ${font.subtitle3_300_14}`}>{dDay && dDay[0].content}</span>
                </>
            )}
        </div>
    );
};

export default MainDday;
