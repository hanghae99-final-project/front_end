import React, { useState } from "react";
import TodoPost from "./TodoPost";
import TodoList from "./TodoList";
import styles from "./todoModal.module.css";
import font from "../../common/css/font.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TodoModal = () => {
  const [modifyOn, setModifyOn] = useState("");
  const [modifyModal, setModifyModal] = useState(""); //수정 On off 컨트롤
  const [closeTodo, setCloseTodo] = useState(""); //수정 버튼클릭시 Todo를 수정 modal로 전환
  const [openPost, setOpenPost] = useState(false); //Post On, Off 핸들러
  const [mode, setMode] = useState("post");

  const openPostHandler = () => {
    setOpenPost(!openPost);
    setModifyModal("");
    setModifyOn("");
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
      {openPost ? <TodoPost className={styles.openTodo} setOpenPost={setOpenPost} /> : ""}
      <TodoList
        openPost={openPost}
        modifyOn={modifyOn}
        setModifyOn={setModifyOn}
        modifyModal={modifyModal}
        setModifyModal={setModifyModal}
        closeTodo={closeTodo}
        setOpenPost={setOpenPost}
      />
    </div>
  );
};

export default TodoModal;
