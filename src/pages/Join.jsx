import React, { useState } from "react";
import Layout from "../layout/Layout";
import Nickname from "../components/join/Nickname";
import Age from "../components/join/Age";
import Specialty from "../components/join/Specialty";
import Done from "../components/join/Done";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Join = () => {
  const [mode, setMode] = useState("Nickname");
  const [checkMsg, setCheckMsg] = useState("2~8자의 한글만 사용 가능해요");
  const initialState = { nickname: "", ageGroup: "", specialty: "" };
  const [userInfo, setUserInfo] = useState(initialState);
  const navi = useNavigate();
  const use = useSelector(state => state.main);

  useEffect(() => {
    // localStorage.getItem("token") === null && navi("/");
    // if (use?.user?.nickname !== "" && localStorage.getItem("token") !== null) {
    //   navi("/home");
    // }
  }, []);

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
      {mode === "Age" && <Age setMode={setMode} userInfo={userInfo} setUserInfo={setUserInfo} />}
      {mode === "Specialty" && <Specialty setMode={setMode} userInfo={userInfo} setUserInfo={setUserInfo} />}
      {mode === "Done" && (
        <Done setMode={setMode} userInfo={userInfo} setUserInfo={setUserInfo} nickname={userInfo.nickname} />
      )}
    </Layout>
  );
};

export default Join;
