import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from '../app/slice/toDoSlice';
import styles from '../css/toDoPost.module.css';
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
    console.log(toDo)
    if (toDo.work === "" || toDo.color === "") {
      setBtnOn(true)
    } else {
      setBtnOn(false)
    }

    // if (btnOnOff === true) {
    //   setBtnDisabled(false)
    // } else {
    //   setBtnDisabled(true)
    // }
  }, [toDo])

  const onSubmitToDoHandler = (e) => {
    e.preventDefault();
    dispatch(addList(toDo));
  };

  return (
    <form className={styles.toDoContainer} onSubmit={onSubmitToDoHandler}>
      <input onChange={onChangeToDoHandler} type='text' name='work' />

      <input className={styles.color1} id='color1' onChange={onChangeToDoHandler} type='radio' name='color' value='#FF8D8D' />

      <input className={styles.color2} id='color2' onChange={onChangeToDoHandler} type='radio' name='color' value='#FFBA53' />

      <input className={styles.color3} id='color3' onChange={onChangeToDoHandler} type='radio' name='color' value='#FFEF61' />

      <input className={styles.color4} id='color4' onChange={onChangeToDoHandler} type='radio' name='color' value='#B9FFA0' />

      <input className={styles.color5} id='color5' onChange={onChangeToDoHandler} type='radio' name='color' value='#99DEE2' />

      <input className={styles.color6} id='color6' onChange={onChangeToDoHandler} type='radio' name='color' value='#9FB4FF' />

      <input className={styles.color7} id='color7' onChange={onChangeToDoHandler} type='radio' name='color' value='#B187E7' />

      <input className={styles.color8} id='color8' onChange={onChangeToDoHandler} type='radio' name='color' value='#E8A2D4' />
      <button type='submit' disabled={btnOn}>+</button>
    </form>
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
