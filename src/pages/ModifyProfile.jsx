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
import font from "../common/css/font.module.css";
import axios from "axios";

const ModifyProfile = () => {
  const check = /^[가-힣a-zA-Z0-9]{2,12}$/;
  const email = jwtDecode(localStorage.getItem("token"));
  const pickAge = ["20대", "30대", "기타"];
  const [borderColor, setBorderColor] = useState("");
  const [checkMsg, setCheckMsg] = useState("2~12자의 닉네임을 설정해주세요");
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
    "무역·유통",
    "건설·건축",
    "공무원",
    "관광레저서비스"
  ];
  const dispatch = useDispatch();
  const navi = useNavigate();

  useEffect(() => {
    localStorage.getItem("token") === null && navi("/");
  }, []);

  useEffect(() => {
    dispatch(__getProfile());
  }, [dispatch]);
  const userData = useSelector(data => data.profile);
  const initialState = {};
  const [modifyInfo, setModifyInfo] = useState(initialState);

  useEffect(() => {
    if (userData.nickname !== undefined) {
      setModifyInfo({
        nickname: userData.nickname,
        ageGroup: userData.ageGroup,
        specialty: userData.specialty
      });
    }
  }, [userData]);

  const checkNickname = e => {
    if (!check.test(modifyInfo.nickname)) {
      setBorderColor("orange");
      setCheckMsg("이모티콘,공백은 사용 불가능해요");
    } else if (modifyInfo.nickname === userData.nickname) {
      setCheckMsg("현재 사용중인 닉네임과 같아요");
    } else {
      axios
        .get(process.env.REACT_APP_SERVER_URL + `/profile/nick/${modifyInfo.nickname}`, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`
          }
        })
        .then(res =>
          res.data.ok === true
            ? (setBorderColor("green"), setCheckMsg("사용 가능한 닉네임이에요"))
            : (setBorderColor("red"), setCheckMsg("이미 존재하는 닉네임이에요"))
        );
    }
  };

  useEffect(() => {
    setBorderColor("");
    const timer = setTimeout(() => {
      checkNickname();
    }, 500);
    if (modifyInfo.nickname === "") {
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [modifyInfo]);

  useEffect(() => {
    const timer = setTimeout(() => {
      checkNickname();
    }, 500);
    if (modifyInfo.nickname === "") {
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [modifyInfo]);

  const onUpdate = () => {
    if (
      borderColor === "green" ||
      modifyInfo.ageGroup !== userData.ageGroup ||
      modifyInfo.specialty !== userData.specialty
    ) {
      dispatch(__updateProfile(modifyInfo));
      navi("/mypage");
    }
  };

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
          />
          <span className={font.subtitle2_600_16}>프로필 수정</span>
          {modifyInfo.nickname !== userData.nickname ||
          modifyInfo.ageGroup !== userData.ageGroup ||
          modifyInfo.specialty !== userData.specialty ? (
            <button className={`${styles.doneBtn} ${font.subtitle2_300_16}`} onClick={() => onUpdate()}>
              저장
            </button>
          ) : (
            <button className={font.subtitle2_300_16} style={{ color: "var(--neutral-50)" }}>
              저장
            </button>
          )}
        </div>
        <div className={styles.emailBox}>
          <p className={font.subtitle2_600_16}>로그인 계정</p>
          <input
            type="text"
            className={font.body_300_16}
            placeholder={email.userEmail}
            spellCheck={false}
            disabled={true}
          ></input>
        </div>
        <form className={styles.nicknameBox} onSubmit={checkNickname}>
          <p className={font.subtitle2_600_16}>닉네임</p>
          <label>
            <input
              className={
                modifyInfo.nickname !== "" && borderColor === "red"
                  ? `${styles.nicknameInputRed} ${font.body_300_16} animate__animated animate__headShake`
                  : modifyInfo.nickname !== "" && borderColor === "green"
                  ? `${styles.nicknameInputGreen} ${font.body_300_16}`
                  : modifyInfo.nickname !== "" && borderColor === "orange"
                  ? `${styles.nicknameInputOrange} ${font.body_300_16} animate__animated animate__headShake`
                  : `${styles.nicknameInputBase} ${font.body_300_16}`
              }
              type="text"
              name="nickname"
              value={modifyInfo.nickname}
              onChange={e => {
                setModifyInfo({ ...modifyInfo, nickname: e.target.value });
              }}
              placeholder={userData.nickname}
              autoComplete="off"
              autoFocus={true}
              spellCheck={false}
              maxLength="12"
            ></input>
          </label>

          <p
            className={
              borderColor === "orange"
                ? `${styles.checkMsgOrange} ${font.caption2_300_10}`
                : borderColor === "red"
                ? `${styles.checkMsgRed} ${font.caption2_300_10}`
                : borderColor === "green"
                ? `${styles.checkMsgGreen} ${font.caption2_300_10}`
                : `${styles.checkMsg} ${font.caption2_300_10}`
            }
          >
            {""}
            {borderColor === "orange" && <Orange style={{ marginRight: "0.25rem" }} />}
            {borderColor === "red" && <Red style={{ marginRight: "0.25rem" }} />}
            {borderColor === "green" && <Green style={{ marginRight: "0.25rem" }} />}
            {checkMsg}
          </p>
        </form>
        <div className={styles.ageBox}>
          <p className={font.subtitle2_600_16}>연령대</p>
          <div className={styles.ageContainer}>
            {pickAge.map((pick, i) => {
              return (
                <div className={styles.ageBtnBox} key={i}>
                  {modifyInfo.ageGroup === pick ? (
                    <button
                      className={`${styles.agePick} ${font.subtitle2_600_16}`}
                      onClick={() => {
                        setModifyInfo({ ...modifyInfo, ageGroup: pick });
                      }}
                    >
                      <Check />
                      {pick}
                    </button>
                  ) : (
                    <button
                      className={`${styles.ageAnother} ${font.subtitle2_600_16}`}
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
          <p className={font.subtitle2_600_16}>준비하고 있는 분야</p>
          <div className={styles.specContainer}>
            {major.map((pick, i) => {
              return (
                <div className={styles.specBtnBox} key={i}>
                  {modifyInfo.specialty === pick ? (
                    <button
                      className={`${styles.specPick} ${font.subtitle2_300_16}`}
                      onClick={() => {
                        setModifyInfo({ ...modifyInfo, specialty: pick });
                      }}
                    >
                      <Check />
                      {pick}
                    </button>
                  ) : (
                    <button
                      className={`${styles.specAnother} ${font.subtitle2_300_16}`}
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
