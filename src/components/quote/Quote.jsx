import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getQuote } from "../../app/slice/mainSlice";
import styles from "./quote.module.css";
import font from "../../common/css/font.module.css";
import { memo } from "react";

const Quote = () => {
  const dispatch = useDispatch();
  const quote = useSelector(state => state.main.quote);
  useEffect(() => {
    dispatch(__getQuote());
  }, []);

  return (
    <div className={styles.heightBox}>
      <div className={styles.quoteBox}>
        <span className={`${styles.quotes} ${font.subtitle_600_18}`}>"</span>
        <div className={`${styles.quote} ${font.body2_300_14}`}>{quote}</div>
        <span className={`${styles.quotes} ${font.subtitle_600_18}`}>"</span>
      </div>
    </div>
  );
};

export default memo(Quote);
