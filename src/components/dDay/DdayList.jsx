import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getDday, __delDday } from "../../app/slice/DdaySlice";
import dayjs from "dayjs";
import font from "../../common/css/font.module.css";
import styles from "./ddayList.module.css";
import PostDday from "./PostDday";

const DdayList = ({ modifyId, setModifyId, setBlurSwich, blurHandler }) => {
  const dispatch = useDispatch();
  const dDay = useSelector(state => state.dDay.myDday);
  const [modifyMode, setModifyMode] = useState(true);
  const [active, setActive] = useState("");

  useEffect(() => {
    dispatch(__getDday());
  }, []);

  const deleteDday = id => {
    dispatch(__delDday(id));
  };

  return (
    <ul className={styles.container}>
      {dDay?.map(data => {
        const today = dayjs();
        const deadline = dayjs(data.deadline);
        const dDayCount = Math.ceil(deadline.diff(today, "day", true));

        const modifyOff = () => {
          setModifyId("");
        };

        const modifyOn = () => {
          setModifyId(data._id);
          setBlurSwich(true);
        };

        return (
          <div key={data._id}>
            <li className={`${data._id === active ? styles.active : styles.innerWarp}`}>
              <div
                className={styles.DdayContainer}
                onClick={() => {
                  setActive(prev => (prev === data._id ? "" : data._id));
                }}
              >
                <div className={styles.DdayWarp}>
                  <div className={styles.DdayValueWarp}>
                    <div className={styles.DdayVlaue}>
                      <p className={font.caption_600_12}>
                        {dDayCount === 0 ? "D-day" : dDayCount < 0 ? `D+${dDayCount * -1}` : `D-${dDayCount}`}
                      </p>
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
                    modifyId === data._id ? modifyOff() : modifyOn();
                  }}
                ></button>
                <button className={styles.delBtn} onClick={() => deleteDday(data._id)}></button>
              </div>
            </li>
            <div className={modifyId === data._id ? styles.dDayModalOpen : styles.dDayModalClose}>
              <PostDday
                blurHandler={blurHandler}
                dataId={data._id}
                setModifyModal={setModifyId}
                modifyMode={modifyMode}
                setModifyOn={setModifyMode}
                modifyOn={modifyOn}
              />
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default DdayList;
