import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../../app/slice/toDoSlice";
import styles from "./todoBtn.module.css";
import font from "../../common/css/common.module.css";

const TodoBtn = () => {
  const dispatch = useDispatch();
  const toDos = useSelector(state => state.toDo);

  console.log(toDos);

  const totalTodo = toDos.length;
  const isDoneCount = toDos?.filter(data => data?.isDone === true).length;

  useEffect(() => {
    dispatch(getList());
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
