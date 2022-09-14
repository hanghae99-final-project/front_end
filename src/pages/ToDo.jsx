import React from 'react';
import ToDoPost from '../components/ToDoPost';
import ToDoList from '../components/ToDoList';
import Layout from '../components/common/Layout'
import styles from '../css/toDoPage.module.css'

const ToDo = () => {
    return (
        <Layout>
            <div className={styles.container}>
                <ToDoPost></ToDoPost>
                <ToDoList></ToDoList>
            </div>
        </Layout>
    );
};

export default ToDo;
