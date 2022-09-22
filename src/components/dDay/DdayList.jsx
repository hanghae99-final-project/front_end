import React, { useEffect } from "react";
import { __getDday } from "../../app/slice/DdaySlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ddayList.module.css";
import font from "../../common/css/font.module.css";
import { __delDday } from "../../app/slice/DdaySlice";

const DdayList = () => {
    const dispatch = useDispatch();
    const dDay = useSelector((state) => state.dDay.myDday);
    console.log(dDay);

    useEffect(() => {
        dispatch(__getDday());
    }, []);

    const deleteDday = (id) => {
        dispatch(__delDday(id));
    };

    const modifyDday = () => {};

    return (
        <ul className={styles.container}>
            {dDay?.map((data) => {
                console.log(data);
                const today = new Date().getTime();
                const deadline = new Date(data.deadline).getTime();
                const dDay = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

                return (
                    <div key={data._id}>
                        <li className={styles.innerWarp}>
                            <div className={styles.DdayContainer}>
                                <div className={styles.DdayWarp}>
                                    <div className={styles.DdayValueWarp}>
                                        <div className={styles.DdayVlaue}>
                                            <p className={font.caption_600_12}>{dDay === 0 ? "D-day" : dDay < 0 ? `D+${dDay * -1}` : `D-${dDay}`}</p>
                                            <p className={font.body2_300_14}>{data.content}</p>
                                        </div>
                                        <p className={`${font.caption_600_12} ${styles.date}`}>{data.deadline.replaceAll("-", ".")}</p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.btnWarp}>
                                <button className={styles.modifyBtn}></button>
                                <button className={styles.delBtn} onClick={() => deleteDday(data._id)}></button>
                            </div>
                        </li>
                    </div>
                );
            })}
        </ul>
    );
};

export default DdayList;
