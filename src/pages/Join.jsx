
import React, { useState } from "react";
import Layout from "../components/common/Layout";
import Nickname from "../components/join/nickname";
import Age from "../components/join/age";
import Specialty from "../components/join/specialty";
import Done from "../components/join/done";

import { __checkNickname } from "../app/slice/joinSlice";

const Join = () => {
  const check = /^[가-힣]{2,8}$/;
  const [mode, setMode] = useState("Nickname");
  const [checkMsg, setCheckMsg] = useState("8자리의 한글만 사용이 가능해요.");
  const initialState = { nickname: "", ageGroup: "", specialty: "" };
  const [userInfo, setUserInfo] = useState(initialState);

  const onChangeHandleInput = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
    if (!check.test(userInfo.nickname)) {
      setCheckMsg("한글이외엔 허용하지 않아요!");
    } else if (check.test(userInfo.nickname)) {
      setCheckMsg("8자 이내의 한글만 사용 가능해요");
    }

    // !check.test(userInfo.nickname)
    //   ? setCheckMsg("한글이외엔 허용하지 않아요!")
    //   : setCheckMsg("8자 이내의 한글만 사용 가능해요");

    // if (!check.test(userInfo.nickname)) {
    //   setCheckMsg("한글이외엔 허용하지 않아요!");
    // } else if(
    //   userInfo.nickname === ""
    // ) {
    //   setCheckMsg("8자리의 한글만 사용이 가능해요.");
    // }
  };

  console.log(userInfo);
  return (
    <Layout>
      {mode === "Nickname" && (
        <Nickname
          setMode={setMode}
          handleInput={onChangeHandleInput}
          nickname={userInfo.nickname}
          checkMsg={checkMsg}
          setCheckMsg={setCheckMsg}
          initialState={initialState}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      )}
      {mode === "Age" && (
        <Age setMode={setMode} userInfo={userInfo} setUserInfo={setUserInfo} />
      )}
      {mode === "Specialty" && (
        <Specialty
          setMode={setMode}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
      )}
      {mode === "Done" && (
        <Done
          setMode={setMode}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          nickname={userInfo.nickname}
        />
      )}
    </Layout>
  );
};

export default Join;
