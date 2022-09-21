import React, { useState } from "react";
import Layout from "../layout/Layout";
import Nickname from "../components/join/Nickname";
import Age from "../components/join/Age";
import Specialty from "../components/join/Specialty";
import Done from "../components/join/Done";

const Join = () => {
  const [mode, setMode] = useState("Nickname");
  const [checkMsg, setCheckMsg] = useState("8자리의 한글만 사용 가능해요");
  const initialState = { nickname: "", ageGroup: "", specialty: "" };
  const [userInfo, setUserInfo] = useState(initialState);

  console.log(userInfo);
  return (
    <Layout>
      {mode === "Nickname" && (
        <Nickname
          setMode={setMode}
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
