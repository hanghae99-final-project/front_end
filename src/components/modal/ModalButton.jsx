import React from "react";
import styles from "./setTimeModal.module.css";
import font from "../../common/css/font.module.css";

const ModalButton = ({ title, onClickHandler, type, able }) => {
  return (
    <button
      disabled={able}
      onClick={onClickHandler}
      className={`${
        type === "long" ? `${styles.completeButton}` : type === "short" ? `${styles.stopButton}` : `${styles.endButton}`
      } ${font.subtitle2_600_16}`}
    >
      {title}
    </button>
  );
};

export default ModalButton;
