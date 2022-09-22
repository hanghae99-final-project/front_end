import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addList } from "../../app/slice/toDoSlice";
import styles from "./toDoPost.module.css";

const ToDoPost = () => {
    const [btnOn, setBtnOn] = useState(true);
    const [toDo, setToDo] = useState({
        work: "",
        isDone: false,
        color: "#ffffff",
    });

    const [check, setCheck] = useState("#ffffff");

    const dispatch = useDispatch();

    const onChangeToDoHandler = (e) => {
        if (e.target.name === "color") {
            setCheck(e.target.value);
        }
        const { name, value } = e.target;
        setToDo({ ...toDo, [name]: value });
    };

    console.log(toDo.color);
    // 버튼 활성화 로직
    useEffect(() => {
        if (toDo.work === "" || toDo.color === "") {
            setBtnOn(true);
        } else {
            setBtnOn(false);
        }
    }, [toDo]);

    const onSubmitToDoHandler = (e) => {
        e.preventDefault();
        dispatch(addList(toDo));
        setToDo({ ...toDo, work: "" });
    };

    return (
        <form className={styles.toDoContainer} onSubmit={onSubmitToDoHandler}>
            <div className={styles.postWarp}>
                <div className={styles.inputContainer}>
                    <input
                        className={styles.valueInput}
                        onChange={onChangeToDoHandler}
                        type="text"
                        name="work"
                        placeholder="오늘 할일"
                        spellCheck="false"
                        value={toDo.work}
                    />
                    <div className={styles.colorInput}>
                        <input
                            checked={check === "#ff5757"}
                            className={styles.color1}
                            id="color1"
                            onClick={onChangeToDoHandler}
                            type="radio"
                            name="color"
                            value="#ff5757"
                        />

                        <input
                            checked={check === "#ff8058"}
                            className={styles.color2}
                            id="color2"
                            onClick={onChangeToDoHandler}
                            type="radio"
                            name="color"
                            value="#ff8058"
                        />

                        <input
                            checked={check === "#92cd6e"}
                            className={styles.color3}
                            id="color3"
                            onClick={onChangeToDoHandler}
                            type="radio"
                            name="color"
                            value="#92cd6e"
                        />

                        <input
                            checked={check === "#66ffa6"}
                            className={styles.color4}
                            id="color4"
                            onClick={onChangeToDoHandler}
                            type="radio"
                            name="color"
                            value="#66ffa6"
                        />

                        <input
                            checked={check === "#75c5ff"}
                            className={styles.color5}
                            id="color5"
                            onClick={onChangeToDoHandler}
                            type="radio"
                            name="color"
                            value="#75c5ff"
                        />

                        <input
                            checked={check === "#ffffff"}
                            className={styles.color6}
                            id="color6"
                            onClick={onChangeToDoHandler}
                            type="radio"
                            name="color"
                            value="#ffffff"
                        />
                    </div>
                </div>
            </div>
            <button className={`${styles.postBtn} ${btnOn === false ? styles.btnOn : ""}`} type="submit" disabled={btnOn}></button>
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
