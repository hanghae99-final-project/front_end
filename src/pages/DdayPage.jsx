import React, { useState } from "react";
import DdayList from "../components/dDay/DdayList";
import PostDday from "../components/dDay/PostDday";
import styles from "./css/DdayPage.module.css";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DdayPage = () => {
  const [openPost, setOpenPost] = useState(false);
  const [blurSwich, setBlurSwich] = useState(false);
  const [modifyId, setModifyId] = useState("");

  const openPostHandler = () => {
    setOpenPost(!openPost);
  };

  const blurHandler = () => {
    setBlurSwich(!blurSwich);
    setModifyId("");
  };

  const navi = useNavigate();

  return (
    <Layout>
      <div className={styles.container}>
        {blurSwich && <div onClick={blurHandler} className={styles.blurOn}></div>}
        {openPost && <div onClick={openPostHandler} className={styles.blurOn}></div>}
        <div className={styles.DdayTitle}>
          <button className={styles.prevBtn} onClick={() => navi(-1)}></button>
          <h1>디데이 설정</h1>
          <button className={styles.addBtn} onClick={openPostHandler}></button>
        </div>
        <DdayList modifyId={modifyId} setModifyId={setModifyId} setBlurSwich={setBlurSwich} blurHandler={blurHandler} />
        <div className={openPost ? styles.dDayModalOpen : styles.dDayModalClose}>
          <PostDday setOpenPost={setOpenPost} openPostHandler={openPostHandler} />
        </div>
      </div>
    </Layout>
  );
};

export default DdayPage;
