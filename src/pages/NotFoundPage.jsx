import React from "react";
import Layout from "../layout/Layout";
import failed from "../common/svg/sms_failed.png";
import styles from "./css/notFoundPage.module.css";
import font from "../common/css/font.module.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Layout>
      <div className={styles.message}>
        <img src={failed} alt="" className={styles.failed} />
        <div className={styles.text}>
          <div className={`${styles.aboveText} ${font.header3_600_24}`}>페이지를 찾을 수 없어요</div>
          <div className={`${styles.underText} ${font.header3_600_24}`}>404 Not Found</div>
        </div>
        <Link to="/home">
          <button className={`${styles.button} ${font.subtitle2_600_16}`}>메인으로 돌아가기</button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
