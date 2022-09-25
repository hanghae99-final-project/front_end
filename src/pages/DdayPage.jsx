import React, { useState } from "react";
import DdayList from "../components/dDay/DdayList";
import PostDday from "../components/dDay/PostDday";
import styles from "./css/DdayPage.module.css";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DdayPage = () => {
  const [openPost, setOpenPost] = useState(false);

  const openPostHandler = () => {
    setOpenPost(!openPost);
  };

  const navi = useNavigate();

  useEffect(() => {
    localStorage.getItem("token") === null && navi("/");
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.DdayTitle}>
          <button className={styles.prevBtn}></button>
          <h1>디데이 설정</h1>
          <button className={styles.addBtn} onClick={openPostHandler}></button>
        </div>
        <DdayList />
        {openPost ? <PostDday className={styles.openTodo} /> : ""}
      </div>
    </Layout>
  );
};

export default DdayPage;
