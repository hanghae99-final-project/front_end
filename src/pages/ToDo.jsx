import React from 'react';
import ToDoPost from '../components/todo/ToDoPost';
import ToDoList from '../components/todo/ToDoList';
import styles from './css/toDoPage.module.css';

const ToDo = () => {
    return (
        <div className={styles.container}>
            <div className={styles.toDoTitle}>
                <h1>오늘 할 일</h1>
            </div>
            <ToDoPost />
            <ToDoList />
        </div>
    );
};

export default ToDo;
