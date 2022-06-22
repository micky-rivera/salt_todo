import React, { useEffect } from 'react';
import './TodoList.scss';
import TodoForm from '../TodoForm/TodoForm';
import { useAppSelector } from '../../redux/hooks';
import TodoItem from '../TodoItem/TodoItem';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { setList } from '../../redux/slices';

function TodoList() {
    const state = useAppSelector(state => state.app);
    const todoList = state.todoList;
    const todoId = useLocation().pathname.substring(1);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const url = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

    useEffect(()=> {
        fetch(`${url}/api/todolist/${todoId}`)
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                return navigate('/');
            }
            dispatch(setList(data.content));
        })
    }, []);

    useEffect(()=> {
        // make put request to BE with the new list
    }, [todoList]);


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
