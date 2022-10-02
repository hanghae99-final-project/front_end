import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { __addTodo } from "../../app/slice/todoSlice";
import styled from "styled-components";
import "../../common/css/color.css";
import styles from "./todoPost.module.css";

const TodoPost = ({ setOpenPost }) => {
  const dispatch = useDispatch();
  const [btnOn, setBtnOn] = useState(true);
  const [toDo, setToDo] = useState({
    work: "",
    isDone: false,
    color: "#ffffff"
  });
  const colorValue = ["#ff5757", "#ff8058", "#92cd6e", "#66ffa6", "#75c5ff", "#ffffff"];

  // default color checked
  const [check, setCheck] = useState("#ffffff");

  const onChangeToDoHandler = e => {
    if (e.target.name === "color") {
      setCheck(e.target.value);
    }
    const { name, value } = e.target;
    setToDo({ ...toDo, [name]: value });
  };

  // 버튼 활성화
  useEffect(() => {
    if (toDo.work === "" || toDo.color === "") {
      setBtnOn(true);
    } else {
      setBtnOn(false);
    }
  }, [toDo]);

  const onSubmitToDoHandler = e => {
    e.preventDefault();
    dispatch(__addTodo(toDo));
    setToDo({ ...toDo, work: "" });
    setOpenPost(false);
  };

  return (
    <form className={styles.toDoContainer} onSubmit={onSubmitToDoHandler}>
      <div className={styles.postWarp}>
        <div className={styles.inputContainer}>
          <input
            className={styles.valueInput}
            maxLength={20}
            onChange={onChangeToDoHandler}
            type="text"
            name="work"
            placeholder="오늘 할일"
            spellCheck="false"
            value={toDo.work}
          />
          <div className={styles.colorInput}>
            {colorValue.map((data, idx) => {
              console.log(data);
              return (
                <input
                  key={data}
                  checked={check === data}
                  id={data}
                  name="color"
                  value={data}
                  onChange={onChangeToDoHandler}
                  className={styles["color" + (idx + 1)]}
                  type="radio"
                />
              );
            })}
          </div>
        </div>
      </div>
      <button
        className={`${styles.postBtn} ${btnOn === false ? styles.btnOn : ""}`}
        type="submit"
        disabled={btnOn}
      ></button>
    </form>
  );
};

export default TodoPost;
