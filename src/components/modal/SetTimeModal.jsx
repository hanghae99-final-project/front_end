import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { __postTargetTime } from "../../app/slice/timeTimerSlice";
import styles from "./setTimeModal.module.css";
import SetTimePicker from "./SetTimePicker";
import ModalButton from "./ModalButton";
import ModalTitle from "./ModalTitle";

const SetTimeModal = ({ time, setTime, setMode, targetToSec }) => {
  const dispatch = useDispatch();
  const setTargetTime = () => {
    setMode("normal");
    dispatch(__postTargetTime({ targetTime: targetToSec * 1000 }));
  };

  return (
    <div className={styles.modal}>
      <ModalTitle title="목표 설정시간" func={() => setMode("normal")} />
      <SetTimePicker setTime={setTime} time={time} />
      <div className={styles.buttonBox}>
        <ModalButton title="설정하기" type="long" onClickHandler={setTargetTime} />
      </div>
    </div>
  );
};

export default memo(SetTimeModal);
