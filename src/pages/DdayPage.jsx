import React, { useState } from "react";
import DdayList from "../components/dDay/DdayList";
import PostDday from "../components/dDay/PostDday";
import styles from "./css/DdayPage.module.css";
import Layout from "../layout/Layout";

const DdayPage = () => {
    const [openPost, setOpenPost] = useState(false);

    const openPostHandler = () => {
        setOpenPost(!openPost);
    };

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
