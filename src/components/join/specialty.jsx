import React from "react";
import styles from "./joincss/join.module.css";
import { useDispatch } from "react-redux";
import { __joinUser } from "../../app/slice/joinSlice";

const Specialty = ({ setMode, setUserInfo, userInfo }) => {
  const dispatch = useDispatch();
  const major = [
    "경영사무",
    "마케팅·광고·홍보",
    "무역·유통",
    "디자인",
    "영업·고객상담",
    "IT개발·인터넷",
    "전문·특수·연구직",
    "미디어·문화",
    "교육",
    "서비스",
    "연구개발·설계",
    "관광레저서비스",
    "건설·건축",
    "의료",
    "공무원",
  ];

  const postJoinHandle = () => {
    dispatch(__joinUser(userInfo));
    console.log(userInfo);
    setMode("Done");
  };

  return (
    <div>
      <div>
        <p>와타시의 전문분야</p>
        <br />
      </div>
      {major.map((pick, i) => {
        return (
          <div key={i}>
            {userInfo.specialty === pick ? (
              <span
                className={styles.slice}
                style={{ backgroundColor: "#2d2d2d" }}
                onClick={() => {
                  setUserInfo({ ...userInfo, specialty: pick });
                }}
              >
                {pick}
              </span>
            ) : (
              <span
                className={styles.slice}
                onClick={() => {
                  setUserInfo({ ...userInfo, specialty: pick });
                }}
              >
                {pick}
              </span>
            )}
          </div>
        );
      })}
      {userInfo.age === "" ? (
        <button disabled className={styles.joinBtn}>
          확인
        </button>
      ) : (
        <button className={styles.joinBtn} onClick={postJoinHandle}>
          확인
        </button>
      )}
    </div>
  );
};

export default Specialty;
