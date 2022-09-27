import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getDday, __delDday } from "../../app/slice/DdaySlice";
import font from "../../common/css/font.module.css";
import styles from "./ddayList.module.css";
import PostDday from "./PostDday";

const DdayList = () => {
  const dispatch = useDispatch();
  const dDay = useSelector(state => state.dDay.myDday);
  const [modifyId, setModifyId] = useState("");
  const [modifyMode, setModifyMode] = useState(false);
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
        console.log(data);
        const today = new Date().getTime();
        const deadline = new Date(data.deadline).getTime();
        const dDay = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

        const modifyOn = () => {
          setModifyMode(false);
          setModifyId("");
        };

        const modifyOff = () => {
          setModifyMode(true);
          setModifyId(data._id);
        };

        return (
          <div
            key={data._id}
            onClick={() => {
              setActive(prev => (prev === data._id ? "" : data._id));
            }}
          >
            {}
            <li className={`${data._id === active ? `${styles.innerWarp} ${styles.active}` : styles.innerWarp}`}>
              <div className={styles.DdayContainer}>
                <div className={styles.DdayWarp}>
                  <div className={styles.DdayValueWarp}>
                    <div className={styles.DdayVlaue}>
                      <p className={font.caption_600_12}>
                        {dDay === 0 ? "D-day" : dDay < 0 ? `D+${dDay * -1}` : `D-${dDay}`}
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
                    modifyId === data._id ? modifyOn() : modifyOff();
                  }}
                ></button>
                <button className={styles.delBtn} onClick={() => deleteDday(data._id)}></button>
              </div>
            </li>
            <div className={modifyId === data._id ? styles.dDayModalOpen : styles.dDayModalClose}>
              <PostDday
                dataId={data._id}
                setModifyModal={setModifyId}
                modifyOn={modifyMode}
                setModifyOn={setModifyMode}
              />
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default DdayList;
