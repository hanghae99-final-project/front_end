import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getProfile, __updateProfile } from "../app/slice/profileSlice";
import arrowBtn2 from "../common/svg/arrowback_icon2.svg";
import { ReactComponent as Check } from "../common/svg/check_icon.svg";
import { ReactComponent as Orange } from "../common/svg/orange.svg";
import { ReactComponent as Red } from "../common/svg/red.svg";
import { ReactComponent as Green } from "../common/svg/green.svg";
import Layout from "../layout/Layout";
import styles from "./css/profile.module.css";
import jwtDecode from "jwt-decode";
import axios from "axios";

const ModifyProfile = () => {
  const check = /^[가-힣]{2,8}$/;
  const email = jwtDecode(localStorage.getItem("token"));
  const pickAge = ["20대", "30대", "기타"];
  const [borderColor, setBorderColor] = useState("");
  const [checkMsg, setCheckMsg] = useState("2~8자의 한글만 가능해요");
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
  const dispatch = useDispatch();
  const navi = useNavigate();

  useEffect(() => {
    dispatch(__getProfile());
  }, [dispatch]);
  const userData = useSelector((data) => data.profile);
  const initialState = {};

  useEffect(() => {
    if (userData.nickname !== undefined) {
      setModifyInfo({
        nickname: userData.nickname,
        ageGroup: userData.ageGroup,
        specialty: userData.specialty,
      });
    }
  }, [userData]);

  const checkNickname = () => {
    if (!check.test(modifyInfo.nickname)) {
      setBorderColor("orange");
      setCheckMsg("2글자 이상의 한글만 가능해요");
    } else {
      axios
        .get(process.env.REACT_APP_SERVER_URL + `/profile/nick/${modifyInfo.nickname}`, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) =>
          res.data.ok === true
            ? (setBorderColor("green"), setCheckMsg("사용 가능한 닉네임이에요"))
            : (setBorderColor("red"), setCheckMsg("이미 존재하는 닉네임이에요"))
        );
    }
  };

  const [modifyInfo, setModifyInfo] = useState(initialState);

  const onChangeHandleInput = (e) => {
    const { name, value } = e.target;
    setBorderColor("");
    setModifyInfo({ ...modifyInfo, [name]: value });
  };

  const onUpdate = () => {
    if (setBorderColor === "green" && check.test(modifyInfo.nickname)) {
      dispatch(__updateProfile(modifyInfo));
      navi("/mypage");
    }
  };

  console.log(userData);
  console.log(modifyInfo);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.topBox}>
          <button
            className={styles.backArrow}
            onClick={() => {
              navi("/mypage");
            }}
            src={arrowBtn2}
            alt={arrowBtn2}
          />
          <span>프로필 수정</span>
          {modifyInfo.nickname !== userData.nickname || modifyInfo.ageGroup !== userData.ageGroup || modifyInfo.specialty !== userData.specialty ? (
            <button className={styles.doneBtn} onClick={() => onUpdate()}>
              저장
            </button>
          ) : (
            <button style={{ color: "var(--neutral-50)" }}>저장</button>
          )}
        </div>
        <div className={styles.emailBox}>
          <p>로그인 계정</p>
          <input type="text" placeholder={email.userEmail} disabled={true}></input>
        </div>
        <div className={styles.nicknameBox}>
          <p>닉네임</p>
          <input
            className={
              modifyInfo.nickname !== "" && borderColor === "red"
                ? `${styles.nicknameInputRed} animate__animated animate__headShake`
                : modifyInfo.nickname !== "" && borderColor === "green"
                ? styles.nicknameInputGreen
                : modifyInfo.nickname !== "" && borderColor === "orange"
                ? `${styles.nicknameInputOrange} animate__animated animate__headShake`
                : styles.nicknameInputBase
            }
            type="text"
            name="nickname"
            value={modifyInfo.nickname}
            onChange={onChangeHandleInput}
            onBlur={checkNickname}
            placeholder={userData.nickname}
            autoComplete="off"
            autoFocus={true}
            maxLength="8"
          ></input>
          <p className={styles.checkMsg}>
            {" "}
            {borderColor === "orange" && <Orange style={{ marginRight: "0.25rem" }} />}
            {borderColor === "red" && <Red style={{ marginRight: "0.25rem" }} />}
            {borderColor === "green" && <Green style={{ marginRight: "0.25rem" }} />}
            {checkMsg}
          </p>
        </div>
        <div className={styles.ageBox}>
          <p>연령대</p>
          <div className={styles.ageContainer}>
            {pickAge.map((pick, i) => {
              return (
                <div key={i}>
                  {modifyInfo.ageGroup === pick ? (
                    <button
                      className={styles.agePick}
                      onClick={() => {
                        setModifyInfo({ ...modifyInfo, ageGroup: pick });
                      }}
                    >
                      <Check />
                      {pick}
                    </button>
                  ) : (
                    <button
                      className={styles.ageAnother}
                      onClick={() => {
                        setModifyInfo({ ...modifyInfo, ageGroup: pick });
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

        <div className={styles.specBox}>
          <p>준비하고 있는 분야</p>
          <div className={styles.specContainer}>
            {major.map((pick, i) => {
              return (
                <div key={i}>
                  {modifyInfo.specialty === pick ? (
                    <button
                      className={styles.specPick}
                      onClick={() => {
                        setModifyInfo({ ...modifyInfo, specialty: pick });
                      }}
                    >
                      <Check />
                      {pick}
                    </button>
                  ) : (
                    <button
                      className={styles.specAnother}
                      onClick={() => {
                        setModifyInfo({ ...modifyInfo, specialty: pick });
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
      </div>
    </Layout>
  );
};
export default ModifyProfile;
