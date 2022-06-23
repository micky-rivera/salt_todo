import React, { useEffect } from 'react';
import './TodoList.scss';
import TodoForm from '../TodoForm/TodoForm';
import { useAppSelector } from '../../redux/hooks';
import TodoItem from '../TodoItem/TodoItem';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { setList } from '../../redux/slices';

const url = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

function TodoList() {
    const state = useAppSelector(state => state.app);
    const todoList = state.todoList;
    const todoId = useLocation().pathname.substring(1);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
        fetch(`${url}/api/todolist/${todoId}`)
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                return navigate('/');
            }
            dispatch(setList(data));
        })
    }, []);

    useEffect(()=> {
        fetch(`${url}/api/todolist`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoList)
        })
    }, [todoList]);


  return (
    <div className="todolist">
        <p className="todolist__title">{todoList.title}</p>
        <div className="todolist__form">
            <TodoForm />
        </div>
        <div className="todolist__container">
            {todoList.content.map((todoItem, index) => (
                <TodoItem key={index} todo={todoItem} />
            ))}
        </div>
    </div>
  );
}

export default TodoList;
