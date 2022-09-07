import React from 'react';
import ToDoPost from '../components/ToDoPost';
import ToDoList from '../components/ToDoList';

const ToDo = () => {
  return (
    <div>
      <ToDoPost></ToDoPost>
      <ToDoList></ToDoList>
    </div>
  );
};

export default ToDo;