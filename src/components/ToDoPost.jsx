import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from '../app/slice/toDoSlice';
import styles from '../css/toDoPost.module.css';
import addIcon from '../svg/add.svg'
// import styled from 'styled-components';

const ToDoPost = () => {
  const [btnOn, setBtnOn] = useState(true)
  const [toDo, setToDo] = useState({
    work: '',
    isDone: false,
    color: '',
  });
  const dispatch = useDispatch();

  const onChangeToDoHandler = (e) => {
    const { name, value } = e.target;
    setToDo({ ...toDo, [name]: value });
  };


  // 버튼 활성화 로직
  useEffect(() => {
    if (toDo.work === "" || toDo.color === "") {
      setBtnOn(true)
    } else {
      setBtnOn(false)
    }
  }, [toDo])

  const onSubmitToDoHandler = (e) => {
    e.preventDefault();
    dispatch(addList(toDo));
    setToDo({ ...toDo, work: '' })
  };

  return (
    <form className={styles.toDoContainer} onSubmit={onSubmitToDoHandler}>
      <div className={styles.postWarp}>
        <div className={styles.inputContainer}>
          <input className={styles.valueInput} onChange={onChangeToDoHandler} type='text' name='work' placeholder="오늘 할일" spellCheck="false" value={toDo.work} />
          <div className={styles.colorInput}>
            <input className={styles.color1} id='color1' onChange={onChangeToDoHandler} type='radio' name='color' value='#ff5757' />

            <input className={styles.color2} id='color2' onChange={onChangeToDoHandler} type='radio' name='color' value='#ff8058' />

            <input className={styles.color3} id='color3' onChange={onChangeToDoHandler} type='radio' name='color' value='#92cd6e' />

            <input className={styles.color4} id='color4' onChange={onChangeToDoHandler} type='radio' name='color' value='#66ffa6' />

            <input className={styles.color5} id='color5' onChange={onChangeToDoHandler} type='radio' name='color' value='#75c5ff' />

            <input className={styles.color6} id='color6' onChange={onChangeToDoHandler} type='radio' name='color' value='#ffffff' />
          </div>
        </div>
      </div>
      <button className={`${styles.postBtn} ${btnOn === false ? styles.btnOn : ""}`} type='submit' disabled={btnOn}>
        <img src={addIcon} alt="addIcon" />
      </button>
    </form >
  );
};

// const ColorPicker = styled.input.attrs({ type: 'radio' })`
//   width: 1rem;
//   height: 1rem;
//   border-radius: 50%;
//   border: 1px solid #999;
//   appearance: none;
//   cursor: pointer;
//   transition: background 0.2s;

//   &:checked {
//     background-color: black;
//     border: none;
//   }
// `;

export default ToDoPost;
