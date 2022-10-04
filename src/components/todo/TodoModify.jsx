import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { __updateTodo } from "../../app/slice/todoSlice";
import styles from "./todoPost.module.css";
import addIcon from "../../common/svg/add.svg";

const TodoModify = ({ todoId, setModifyModal, setModifyOn, todoWork, todoColor }) => {
  const dispatch = useDispatch();
  const [btnOn, setBtnOn] = useState(true);
  const [upDateTodo, setUpDateTodo] = useState({
    work: todoWork,
    color: todoColor
  });

  const colorValue = ["#ff5757", "#ff8058", "#92cd6e", "#66ffa6", "#75c5ff", "#ffffff"];

  const onChangeUpDateToDoHandler = e => {
    const { name, value } = e.target;
    setUpDateTodo({ ...upDateTodo, [name]: value });
  };

  // 버튼 활성화 로직
  useEffect(() => {
    if (upDateTodo.work === "" || upDateTodo.color === "") {
      setBtnOn(true);
    } else {
      setBtnOn(false);
    }
  }, [upDateTodo]);

  const onSubmitUpDateDoHandler = e => {
    e.preventDefault();
    dispatch(__updateTodo({ upDateTodo: upDateTodo, todoId: todoId }));
    setModifyModal("");
    setModifyOn("");
  };

  return (
    <form className={styles.toDoUpdateContainer} onSubmit={onSubmitUpDateDoHandler}>
      <div className={styles.updateWarp}>
        <div className={styles.inputContainer}>
          <input
            className={styles.valueInput}
            onChange={onChangeUpDateToDoHandler}
            maxLength={20}
            value={upDateTodo.work}
            type="text"
            name="work"
            placeholder="오늘 할 일을 수정해 주세요"
            spellCheck="false"
          />
          <div className={styles.colorInput}>
            {colorValue.map((data, idx) => {
              return (
                <input
                  key={data}
                  checked={upDateTodo.color === data}
                  id={data}
                  name="color"
                  value={data}
                  onChange={onChangeUpDateToDoHandler}
                  className={styles["color" + (idx + 1)]}
                  type="radio"
                />
              );
            })}
          </div>
        </div>
      </div>
      <button className={`${styles.postBtn} ${btnOn === false ? styles.btnOn : ""}`} type="submit" disabled={btnOn}>
        <img src={addIcon} alt="addIcon" />
      </button>
    </form>
  );
};

export default TodoModify;
