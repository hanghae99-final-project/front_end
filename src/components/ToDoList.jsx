import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteList, getList, updateList, updateToDoDone } from '../app/slice/toDoSlice';
import styles from '../css/toDoList.module.css';

const ToDoList = () => {
  const [upDateValue, setUpDateValue] = useState('');
  const [upDateColor, setUpDateColor] = useState('#FFFFFF');
  const [btnOn, setBtnOn] = useState(true)

  const dispatch = useDispatch();
  const toDos = useSelector((state) => state.toDo);
  console.log(toDos);

  useEffect(() => {
    dispatch(getList());
  }, []);

  // 수정 input 미작성 시 버튼 비활성화
  useEffect(() => {
    if (upDateValue === "") {
      setBtnOn(true)
    } else {
      setBtnOn(false)
    }
  }, [upDateValue])

  const onDeleteToDoHandler = (toDoId) => {
    dispatch(deleteList(toDoId));
  };

  const onChnageTodoValueUpDateHandler = (e) => {
    setUpDateValue(e.target.value);
  };

  const onUpdateToDoHandler = (toDoId) => {
    if (upDateValue !== '') {
      dispatch(updateList({ id: toDoId, work: upDateValue, color: upDateColor }));
    } else {
      alert('수정할 내용을 입력해 주세요.');
    }
    setUpDateValue('');
  };

  const onClickToDoDone = (isDone, toDoId) => {
    dispatch(updateToDoDone({ isDone: !isDone, id: toDoId }));
  };

  return (
    <ul>
      {toDos
        ?.map((toDo) => {
          return (
            <li key={toDo._id} className={styles.toDoContainer}>
              <div className={styles.toDoWarp}>
                <div className={styles.toDoValueWarp}>
                  <div className={styles.pickColor}></div>
                  <p className={toDo.isDone ? styles.ToDoTrue : styles.ToDoFalse}>{toDo.work}</p>
                </div>
                <button className={toDo.isDone ? styles.isDoneTureBtn : styles.isDoneFalseBtn} onClick={() => onClickToDoDone(toDo.isDone, toDo._id)}>{/* {toDo.isDone ? '취소' : '완료'} */}</button>

                {/* <button onClick={() => onDeleteToDoHandler(toDo._id)} type='button'>
                -
              </button>
              <input type='text' onChange={onChnageTodoValueUpDateHandler} />
              <button disabled={btnOn} onClick={() => onUpdateToDoHandler(toDo._id)}>수정</button> */}
              </div>
            </li>
          );
        })
        .reverse()}
    </ul>
  );
};

export default ToDoList;
