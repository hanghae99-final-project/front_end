import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getProfile, __updateProfile } from "../app/slice/profileSlice";
import { ReactComponent as ArrowBack } from "../common/svg/arrowback_icon2.svg";
import styles from "./css/profile.module.css";
import Layout from "../layout/Layout";

const ModifyProfile = () => {
  const pickAge = ["20대", "30대", "기타"];
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

  const dispatch = useDispatch();

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

  const [userNickname, setUserNickname] = useState(userData.nickname);
  const [userAge, setUserAge] = useState();
  const [userSpecialty, setUserSpecialty] = useState();

  const [modifyInfo, setModifyInfo] = useState(initialState);

  const onChangeHandleInput = (e) => {
    const { name, value } = e.target;
    setModifyInfo({ ...modifyInfo, [name]: value });
  };

  const onUpdate = () => {
    dispatch(__updateProfile(modifyInfo));
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.topBox}>
          <ArrowBack />
          <span>프로필 수정</span>
          <span>저장</span>
        </div>
        <div className={styles.emailBox}>
          <p>로그인 계정</p>
          <input
            type="text"
            placeholder="test@test.com"
            disabled={true}
          ></input>
        </div>
        <div className={styles.nicknameBox}>
          <p>닉네임</p>
          <input
            type="text"
            name="nickname"
            // className={styles.inputNickname}
            value={modifyInfo.nickname}
            onChange={onChangeHandleInput}
            placeholder={userData.nickname}
            autoComplete="off"
            autoFocus={true}
            maxLength="8"
          ></input>
          <p className={styles.checkMsg}>특수문자는 사용 불가능해요</p>
        </div>

        {/* <input
          type="text"
          name="nickname"
          // className={styles.inputNickname}
          value={modifyInfo.nickname}
          onChange={onChangeHandleInput}
          placeholder={userData.nickname}
          autoComplete="off"
          autoFocus={true}
          maxLength="8"
        ></input> */}
        <p>@@@@@@@@@@@@@@@@@@@@@</p>
        <div>
          {pickAge.map((pick, i) => {
            return (
              <div key={i}>
                {modifyInfo.ageGroup === pick ? (
                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={() => {
                      setModifyInfo({ ...modifyInfo, ageGroup: pick });
                    }}
                  >
                    {pick}
                  </button>
                ) : (
                  <button
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
        <p>@@@@@@@@@@@@@@@@@@@@@</p>
        <div>
          {major.map((pick, i) => {
            return (
              <div key={i}>
                {modifyInfo.specialty === pick ? (
                  <span
                    style={{ color: "red" }}
                    onClick={() => {
                      setModifyInfo({ ...modifyInfo, specialty: pick });
                    }}
                  >
                    ✔ {pick}
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      setModifyInfo({ ...modifyInfo, specialty: pick });
                    }}
                  >
                    {pick}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <button
          style={{ width: "20rem", height: "rem", marginTop: "4rem" }}
          onClick={onUpdate}
        >
          저장
        </button>
      </div>
    </Layout>
  );
};
export default ModifyProfile;
