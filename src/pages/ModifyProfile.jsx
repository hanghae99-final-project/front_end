import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getProfile, __updateProfile } from "../app/slice/profileSlice";
import { ReactComponent as ArrowBack } from "../common/svg/arrowback_icon2.svg";
import { ReactComponent as Check } from "../common/svg/check_icon.svg";
import Layout from "../layout/Layout";
import styles from "./css/profile.module.css";

const ModifyProfile = () => {
    const pickAge = ["20대", "30대", "기타"];
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
                    <button onClick={onUpdate}>저장</button>
                </div>
                <div className={styles.emailBox}>
                    <p>로그인 계정</p>
                    <input type='text' placeholder='test@test.com' disabled={true}></input>
                </div>
                <div className={styles.nicknameBox}>
                    <p>닉네임</p>
                    <input
                        type='text'
                        name='nickname'
                        value={modifyInfo.nickname}
                        onChange={onChangeHandleInput}
                        placeholder={userData.nickname}
                        autoComplete='off'
                        autoFocus={true}
                        maxLength='8'></input>
                    <p className={styles.checkMsg}>특수문자는 사용 불가능해요</p>
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
                                            }}>
                                            <Check />
                                            {pick}
                                        </button>
                                    ) : (
                                        <button
                                            className={styles.ageAnother}
                                            onClick={() => {
                                                setModifyInfo({ ...modifyInfo, ageGroup: pick });
                                            }}>
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
                                            }}>
                                            <Check />
                                            {pick}
                                        </button>
                                    ) : (
                                        <button
                                            className={styles.specAnother}
                                            onClick={() => {
                                                setModifyInfo({ ...modifyInfo, specialty: pick });
                                            }}>
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
