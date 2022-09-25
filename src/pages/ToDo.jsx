import React, { useState } from "react";
import ToDoPost from "../components/todo/ToDoPost";
import ToDoList from "../components/todo/ToDoList";
import styles from "./css/toDoPage.module.css";
import font from "../common/css/font.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ToDo = () => {
  const [openPost, setOpenPost] = useState(false);

  const openPostHandler = () => {
    setOpenPost(!openPost);
  };
  const navi = useNavigate();

  useEffect(() => {
    localStorage.getItem("token") === null && navi("/");
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.touchBar}></div>
        <div className={styles.toDoTitle}>
          <button className={styles.emptyBtn}></button>
          <h1 className={font.subtitle2_600_16}>오늘 할 일</h1>
          <button className={styles.addBtn} onClick={openPostHandler}></button>
        </div>
      </div>
      {openPost ? <ToDoPost className={styles.openTodo} /> : ""}
      <ToDoList />
    </div>
  );
};

export default ToDo;
