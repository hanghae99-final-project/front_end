import React from "react";
import font from "../../common/css/font.module.css";
import styles from "./setTimeModal.module.css";
import { ReactComponent as Close } from "../../common/svg/close.svg";

const ModalTitle = ({ title, func }) => {
  return (
    <div className={`${styles.title} ${font.subtitle2_600_16}`}>
      <div>{title}</div>
      <Close className={styles.close} onClick={func} />
    </div>
  );
};

export default ModalTitle;
