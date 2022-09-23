import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getDday, __delDday } from "../../app/slice/DdaySlice";
import DdayModify from "./DdayModify";
import font from "../../common/css/font.module.css";
import styles from "./ddayList.module.css";

const DdayList = () => {
    const dispatch = useDispatch();
    const dDay = useSelector((state) => state.dDay.myDday);
    const [modifyModal, setModifyModal] = useState("");
    const [modifyOn, setModifyOn] = useState("");

    useEffect(() => {
        dispatch(__getDday());
    }, []);

    const deleteDday = (id) => {
        dispatch(__delDday(id));
    };

    const modifyDday = () => {
        setModifyOn(!modifyOn);
    };

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
                                <button
                                    className={styles.modifyBtn}
                                    onClick={() => {
                                        modifyModal === data._id ? setModifyModal("") : setModifyModal(data._id);
                                    }}
                                ></button>
                                <button className={styles.delBtn} onClick={() => deleteDday(data._id)}></button>
                            </div>
                        </li>
                        {modifyModal === data._id ? <DdayModify dataId={data._id} setModifyModal={setModifyModal} setModifyOn={setModifyOn} /> : ""}
                    </div>
                );
            })}
        </ul>
    );
};

export default DdayList;
