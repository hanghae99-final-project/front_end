import React, { useState } from "react";
import ToDoPost from "../components/todo/ToDoPost";
import ToDoList from "../components/todo/ToDoList";
import styles from "./css/toDoPage.module.css";

const ToDo = () => {
    const [openPost, setOpenPost] = useState(false);

    const openPostHandler = () => {
        setOpenPost(!openPost);
    };

    return (
        <div className={styles.container}>
            <div className={styles.toDoTitle}>
                <h1>오늘 할 일</h1>
                <button onClick={openPostHandler}></button>
            </div>
            {openPost ? <ToDoPost className={styles.openTodo} /> : ""}
            <ToDoList />
        </div>
    );
};

export default ToDo;
