import React from 'react';
import './TodoList.scss';
import TodoForm from '../TodoForm/TodoForm';
import { useAppSelector } from '../../redux/hooks';
import TodoItem from '../TodoItem/TodoItem';
import { useLocation } from 'react-router-dom';

function TodoList() {
    const state = useAppSelector(state => state.app);
    const todoList = state.todoList;
    const todoIdQuery = useLocation().pathname.substring(1);

    // check if id in url params is an actual list. If not, display a 404

  return (
    <div className="todolist">
        <TodoForm />
        {todoList.map((todoItem, index) => (
            <TodoItem key={index} todo={todoItem} />
        ))}
    </div>
  );
}

export default TodoList;
