import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getTodoList } from "../../app/slice/todoSlice";
import styles from "./todoBtn.module.css";
import font from "../../common/css/common.module.css";

const TodoBtn = () => {
  const dispatch = useDispatch();
  const todoList = useSelector(state => state.todo);

  const totalTodo = todoList.length;
  const isDoneCount = todoList?.filter(data => data?.isDone === true).length;

  useEffect(() => {
    dispatch(__getTodoList());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={`${font.subtitle2_600_16} ${styles.title}`}>오늘할일</h2>
        <div className={styles.textWarp}>
          <p className={font.subtitle2_600_16}>{isDoneCount}</p>
          <p className={`${font.subtitle2_600_16} ${styles.totalTodo}`}>/{totalTodo}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoBtn;
