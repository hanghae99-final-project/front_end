import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteList, getList, updateToDoDone } from "../../app/slice/toDoSlice";
import ToDoModify from "./ToDoModify";
import styles from "./toDoList.module.css";
import font from "../././../common/css/font.module.css";

const ToDoList = () => {
  const [upDateValue, setUpDateValue] = useState("");
  const [upDateColor, setUpDateColor] = useState("#FFFFFF");
  const [btnOn, setBtnOn] = useState(true);
  const [modifyOn, setModifyOn] = useState("");
  const [modifyModal, setModifyModal] = useState("");

  const dispatch = useDispatch();
  const toDos = useSelector(state => state.toDo);
  console.log(toDos);

  useEffect(() => {
    dispatch(getList());
  }, []);

  const onDeleteToDoHandler = toDoId => {
    dispatch(deleteList(toDoId));
  };

  const onClickModifyOnOff = e => {
    console.dir(e.target);
  };

  const onChnageTodoValueUpDateHandler = e => {
    setUpDateValue(e.target.value);
  };

  // const onUpdateToDoHandler = (toDoId) => {
  //   if (upDateValue !== '') {
  //     dispatch(updateList({ id: toDoId, work: upDateValue, color: upDateColor }));
  //   } else {
  //     alert('수정할 내용을 입력해 주세요.');
  //   }
  //   setUpDateValue('');
  // };

  const onClickToDoDone = (isDone, toDoId) => {
    dispatch(updateToDoDone({ isDone: !isDone, id: toDoId }));
  };

  return (
    <ul className={styles.container}>
      {toDos.length === 0 ? (
        <div className={`${styles.emptyTodo} ${font.subtitle2_600_16}`}>할 일을 추가해 보세요</div>
      ) : (
        <div className={styles.innerContainer}>
          {toDos
            ?.map(toDo => {
              return (
                <div
                  className={modifyOn === toDo._id ? `${styles.outWarp} ${styles.modifyOn}` : `${styles.outWarp}`}
                  key={toDo._id}
                >
                  <li className={styles.innerWarp}>
                    <div className={styles.toDoContainer}>
                      <div className={styles.toDoWarp}>
                        <div
                          onClick={() => {
                            modifyOn === toDo._id ? setModifyOn("") : setModifyOn(toDo._id);
                            setModifyModal("");
                          }}
                          className={styles.toDoValueWarp}
                        >
                          <PickColor bgColor={toDo.color}></PickColor>
                          <p
                            className={
                              toDo.isDone
                                ? `${styles.ToDoTrue} ${font.strikethrough_30014}`
                                : `${styles.ToDoFalse} ${font.body2_300_14}`
                            }
                          >
                            {toDo.work}
                          </p>
                        </div>
                        <button
                          className={toDo.isDone ? styles.isDoneTureBtn : styles.isDoneFalseBtn}
                          onClick={() => onClickToDoDone(toDo.isDone, toDo._id)}
                        ></button>
                      </div>
                    </div>
                  </li>
                  <div className={styles.btnWarp}>
                    <button
                      className={styles.modifyBtn}
                      onClick={() => {
                        modifyModal === toDo._id ? setModifyModal("") : setModifyModal(toDo._id);
                      }}
                    ></button>
                    <button
                      className={styles.delBtn}
                      onClick={() => onDeleteToDoHandler(toDo._id)}
                      type="button"
                    ></button>
                  </div>
                  {modifyModal === toDo._id ? (
                    <ToDoModify toDoId={toDo._id} setModifyModal={setModifyModal} setModifyOn={setModifyOn} />
                  ) : (
                    ""
                  )}
                </div>
              );
            })
            .reverse()}
        </div>
      )}
    </ul>
  );
};

const PickColor = styled.div`
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 50%;
  margin: 0.5rem 0.5rem 0.5rem 0;
  background-color: ${props => props.bgColor};
`;

export default ToDoList;
