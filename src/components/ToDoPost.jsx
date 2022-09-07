import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addList } from '../app/slice/toDoSlice';
import styles from "../css/toDoPost.module.css"
// import styled from 'styled-components';

const ToDoPost = () => {
  const dispatch = useDispatch();

  const [toDo, setToDo] = useState({
    work: "",
    isDone: false,
    color: ""
  })

  const onChangeToDoHandler = (e) => {
    const { name, value } = e.target;
    setToDo({ ...toDo, [name]: value });
  }

  const onSubmitToDoHandler = (e) => {
    e.preventDefault();
    dispatch(addList(toDo));
  }

  return (
    <form className={styles.toDoContainer} onSubmit={onSubmitToDoHandler}>
      <input
        onChange={onChangeToDoHandler}
        type="text"
        name='work'
      />

      <input
        className={styles.color1}
        id='color1'
        onChange={onChangeToDoHandler}
        type="radio"
        name='color'
        value="#FF8D8D"
      />

      <input
        className={styles.color2}
        id='color2'
        onChange={onChangeToDoHandler}
        type="radio"
        name='color'
        value="#FFBA53"
      />

      <input
        className={styles.color3}
        id='color3'
        onChange={onChangeToDoHandler}
        type="radio"
        name='color'
        value="#FFEF61"
      />

      <input
        className={styles.color4}
        id='color4'
        onChange={onChangeToDoHandler}
        type="radio"
        name='color'
        value="#B9FFA0"
      />

      <input
        className={styles.color5}
        id='color5'
        onChange={onChangeToDoHandler}
        type="radio"
        name='color'
        value="#99DEE2"
      />

      <input
        className={styles.color6}
        id='color6'
        onChange={onChangeToDoHandler}
        type="radio"
        name='color'
        value="#9FB4FF"
      />

      <input
        className={styles.color7}
        id='color7'
        onChange={onChangeToDoHandler}
        type="radio"
        name='color'
        value="#B187E7"
      />

      <input
        className={styles.color8}
        id='color8'
        onChange={onChangeToDoHandler}
        type="radio"
        name='color'
        value="#E8A2D4"
      />
      <button type='submit'>+</button>
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