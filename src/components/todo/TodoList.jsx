import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __deleteTodo, __getTodoList, __updateTodoDone } from "../../app/slice/todoSlice";
import TodoModify from "./TodoModify";
import styles from "./todoList.module.css";
import font from "../././../common/css/font.module.css";

const TodoList = ({ setOpenPost, modifyOn, setModifyOn, modifyModal, setModifyModal, openPost }) => {
  const dispatch = useDispatch();
  const todoList = useSelector(state => state.todo);

  useEffect(() => {
    dispatch(__getTodoList());
  }, []);

  const onDeleteToDoHandler = todoId => {
    dispatch(__deleteTodo(todoId));
  };

  const onClickToDoDone = (isDone, todoId) => {
    dispatch(__updateTodoDone({ isDone: !isDone, id: todoId }));
  };

  return (
    <div className={styles.container}>
      {todoList.length === 0 && openPost === false ? (
        <div className={`${styles.emptyTodo} ${font.subtitle2_600_16}`}>할 일을 추가해 보세요</div>
      ) : (
        <div className={styles.innerContainer}>
          {todoList
            ?.map(todo => {
              return (
                <div
                  className={modifyOn === todo._id ? `${styles.outWarp} ${styles.modifyOn}` : `${styles.outWarp}`}
                  key={todo._id}
                >
                  <div style={{ display: "flex" }}>
                    <div className={modifyModal === todo._id ? styles.closeTodo : styles.innerWarp}>
                      <div className={styles.toDoContainer}>
                        <div className={styles.toDoWarp}>
                          <div
                            onClick={() => {
                              modifyOn === todo._id ? setModifyOn("") : setModifyOn(todo._id);
                              setModifyModal("");
                            }}
                            className={styles.toDoValueWarp}
                          >
                            <PickColor bgColor={todo.color}></PickColor>
                            <p
                              className={
                                todo.isDone
                                  ? `${styles.ToDoTrue} ${font.strikethrough_30014}`
                                  : `${styles.ToDoFalse} ${font.body2_300_14}`
                              }
                            >
                              {todo.work}
                            </p>
                          </div>
                          <button
                            className={todo.isDone ? styles.isDoneTureBtn : styles.isDoneFalseBtn}
                            onClick={() => onClickToDoDone(todo.isDone, todo._id)}
                          ></button>
                        </div>
                      </div>
                    </div>

                    <div className={styles.btnWarp}>
                      <button
                        className={styles.modifyBtn}
                        onClick={() => {
                          modifyModal === todo._id
                            ? setModifyModal("")
                            : `${setModifyModal(todo._id)} ${setOpenPost(false)}`;
                        }}
                      ></button>
                      <button
                        className={styles.delBtn}
                        onClick={() => onDeleteToDoHandler(todo._id)}
                        type="button"
                      ></button>
                    </div>
                  </div>

                  {modifyModal === todo._id ? (
                    <TodoModify
                      todoColor={todo.color}
                      todoWork={todo.work}
                      todoId={todo._id}
                      setModifyModal={setModifyModal}
                      setModifyOn={setModifyOn}
                    />
                  ) : (
                    ""
                  )}
                </div>
              );
            })
            .reverse()}
        </div>
      )}
    </div>
  );
};

const PickColor = styled.div`
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 50%;
  margin: 0.5rem 0.5rem 0.5rem 0;
  background-color: ${props => props.bgColor};
`;

export default TodoList;
