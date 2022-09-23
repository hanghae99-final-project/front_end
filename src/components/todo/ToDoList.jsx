import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteList, getList, updateToDoDone } from "../../app/slice/toDoSlice";
import styles from "./toDoList.module.css";
import ToDoModify from "./ToDoModify";

const ToDoList = () => {
    const [upDateValue, setUpDateValue] = useState("");
    const [upDateColor, setUpDateColor] = useState("#FFFFFF");
    const [btnOn, setBtnOn] = useState(true);
    const [modifyOn, setModifyOn] = useState("");
    const [modifyModal, setModifyModal] = useState("");

    const dispatch = useDispatch();
    const toDos = useSelector((state) => state.toDo);
    console.log(toDos);

    useEffect(() => {
        dispatch(getList());
    }, []);

    const onDeleteToDoHandler = (toDoId) => {
        dispatch(deleteList(toDoId));
    };

    const onClickModifyOnOff = (e) => {
        console.dir(e.target);
    };

    const onChnageTodoValueUpDateHandler = (e) => {
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
            {toDos
                ?.map((toDo) => {
                    return (
                        <div key={toDo._id}>
                            <li className={styles.innerWarp}>
                                <div className={modifyOn === toDo._id ? `${styles.toDoContainer} ${styles.modifyOn}` : styles.toDoContainer}>
                                    <div className={styles.toDoWarp}>
                                        <div
                                            onClick={() => {
                                                modifyOn === toDo._id ? setModifyOn("") : setModifyOn(toDo._id);
                                                setModifyModal("");
                                            }}
                                            className={styles.toDoValueWarp}
                                        >
                                            <PickColor bgColor={toDo.color}></PickColor>
                                            <p className={toDo.isDone ? styles.ToDoTrue : styles.ToDoFalse}>{toDo.work}</p>
                                        </div>
                                        <button
                                            className={toDo.isDone ? styles.isDoneTureBtn : styles.isDoneFalseBtn}
                                            onClick={() => onClickToDoDone(toDo.isDone, toDo._id)}
                                        ></button>
                                    </div>
                                </div>

                                <div className={styles.btnWarp}>
                                    <button
                                        className={styles.modifyBtn}
                                        onClick={() => {
                                            modifyModal === toDo._id ? setModifyModal("") : setModifyModal(toDo._id);
                                        }}
                                    ></button>
                                    <button className={styles.delBtn} onClick={() => onDeleteToDoHandler(toDo._id)} type="button"></button>
                                </div>
                            </li>
                            {modifyModal === toDo._id ? <ToDoModify toDoId={toDo._id} setModifyModal={setModifyModal} setModifyOn={setModifyOn} /> : ""}
                        </div>
                    );
                })
                .reverse()}
        </ul>
    );
};

const PickColor = styled.div`
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    margin: 0.5rem 0.5rem 0.5rem 0;
    background-color: ${(props) => props.bgColor};
`;

export default ToDoList;
