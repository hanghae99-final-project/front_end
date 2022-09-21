import React from "react";
import styles from "./join.module.css";
import arrowBtn2 from "../../common/svg/arrowback_icon2.svg";
import { ReactComponent as Check } from "../../common/svg/check_icon.svg";
import { useDispatch } from "react-redux";
import { __joinUser } from "../../app/slice/joinSlice";

const Specialty = ({ setMode, setUserInfo, userInfo }) => {
  const dispatch = useDispatch();
  const major = [
    "경영사무",
    "마케팅·광고·홍보",
    "디자인",
    "의료",
    "영업·고객상담",
    "IT개발·인터넷",
    "전문·특수·연구직",
    "미디어·문화",
    "교육",
    "서비스",
    "연구개발·설계",
    "관광레저서비스",
    "건설·건축",
    "공무원",
    "무역·유통",
  ];
  const postJoinHandle = () => {
    dispatch(__joinUser(userInfo));
    console.log(userInfo);
    setMode("Done");
  };

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <button
          className={styles.arrowBack}
          onClick={() => setMode("Age")}
        ></button>
        <p className={styles.infoText}>
          준비하고 있는 분야를 <br />
          선택해 주세요
        </p>
        <div className={styles.specContainer}>
          {major.map((pick, i) => {
            return (
              <div key={i}>
                {userInfo.specialty === pick ? (
                  <button
                    className={styles.specPick}
                    onClick={() => {
                      setUserInfo({ ...userInfo, specialty: pick });
                    }}
                  >
                    <Check />
                    {pick}
                  </button>
                ) : (
                  <button
                    className={styles.specAnother}
                    onClick={() => {
                      setUserInfo({ ...userInfo, specialty: pick });
                    }}
                  >
                    {pick}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {userInfo.specialty === "" ? (
        <button disabled className={styles.specBtnNo}>
          가입완료
        </button>
      ) : (
        <button className={styles.specBtnYes} onClick={postJoinHandle}>
          가입완료
        </button>
      )}
    </div>
  );
};

export default Specialty;
