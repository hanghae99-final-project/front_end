import React, { useState } from "react";
import Layout from "../components/common/Layout";
import Nickname from "../components/join/nickname";
import Age from "../components/join/age";
import Specialty from "../components/join/specialty";
import Done from "../components/join/done";

const Join = () => {
  const [mode, setMode] = useState("nickname");
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    ageGroup: "",
    specialty: "",
  });

  const onChangeHandleInput = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  console.log(userInfo);
  return (
    <Layout>
      {mode === "nickname" && (
        <Nickname
          setMode={setMode}
          handleInput={onChangeHandleInput}
          nickname={userInfo.nickname}
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
          nickName={userInfo.nickname}
        />
      )}
    </Layout>
  );
};

export default Join;
