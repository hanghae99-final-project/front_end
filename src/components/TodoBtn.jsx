import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getList } from '../app/slice/toDoSlice';
import styles from '../../src/css/todoBtn.module.css'
import styles2 from '../../src/css/common.module.css'

const TodoBtn = () => {
  const dispatch = useDispatch();
  const toDos = useSelector((state) => state.toDo);

  const totalTodo = toDos.length;
  const isDoneCount = toDos?.filter(data => data?.isDone === true).length

  useEffect(() => {
    dispatch(getList());
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.textContainer} >
        <h2 className={`${styles2.subtitle2_600_16} ${styles.title}`}>오늘할일</h2>
        <div className={styles.textWarp}>
          <p className={styles2.subtitle2_600_16}>{isDoneCount}</p>
          <p className={`${styles2.subtitle2_600_16} ${styles.totalTodo}`}>/{totalTodo}</p>
        </div>
      </div>
    </div >
  );
};

export default TodoBtn;