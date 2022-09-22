import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateList } from "../../app/slice/toDoSlice";
import styles from "./toDoPost.module.css";
import addIcon from "../../common/svg/add.svg";

const ToDoModify = ({ toDoId, setModifyModal, setModifyOn }) => {
    console.log(toDoId);
    const [btnOn, setBtnOn] = useState(true);
    const [upDateToDo, setUpDateToDo] = useState({
        work: "",
        color: "",
    });
    const dispatch = useDispatch();

    const onChangeUpDateToDoHandler = (e) => {
        const { name, value } = e.target;
        setUpDateToDo({ ...upDateToDo, [name]: value });
    };

    console.log(upDateToDo);

    // 버튼 활성화 로직
    useEffect(() => {
        if (upDateToDo.work === "" || upDateToDo.color === "") {
            setBtnOn(true);
        } else {
            setBtnOn(false);
        }
    }, [upDateToDo]);

    const onSubmitUpDateDoHandler = (e) => {
        e.preventDefault();
        dispatch(updateList({ upDateToDo: upDateToDo, toDoId: toDoId }));
        setModifyModal("");
        setModifyOn("");
    };

    return (
        <form className={styles.toDoContainer} onSubmit={onSubmitUpDateDoHandler}>
            <div className={styles.postWarp}>
                <div className={styles.inputContainer}>
                    <input
                        className={styles.valueInput}
                        onChange={onChangeUpDateToDoHandler}
                        type='text'
                        name='work'
                        placeholder='오늘 할일'
                        spellCheck='false'
                    />
                    <div className={styles.colorInput}>
                        <input className={styles.color1} id='color1' onChange={onChangeUpDateToDoHandler} type='radio' name='color' value='#ff5757' />

                        <input className={styles.color2} id='color2' onChange={onChangeUpDateToDoHandler} type='radio' name='color' value='#ff8058' />

                        <input className={styles.color3} id='color3' onChange={onChangeUpDateToDoHandler} type='radio' name='color' value='#92cd6e' />

                        <input className={styles.color4} id='color4' onChange={onChangeUpDateToDoHandler} type='radio' name='color' value='#66ffa6' />

                        <input className={styles.color5} id='color5' onChange={onChangeUpDateToDoHandler} type='radio' name='color' value='#75c5ff' />

                        <input className={styles.color6} id='color6' onChange={onChangeUpDateToDoHandler} type='radio' name='color' value='#ffffff' />
                    </div>
                </div>
            </div>
            <button className={`${styles.postBtn} ${btnOn === false ? styles.btnOn : ""}`} type='submit' disabled={btnOn}>
                <img src={addIcon} alt='addIcon' />
            </button>
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

export default ToDoModify;
