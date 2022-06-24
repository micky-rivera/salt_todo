import React, { useState } from 'react';
import './TodoListCard.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { setList } from '../../redux/slices';

const url = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

function TodoListCard({todoList, todoLists, setTodoLists}: TodoListCardProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    let deleting = false;
    const handleClick = () => {
        if (!deleting) {
            navigate(`/${todoList.id}`);
        }
    }
    const handleDelete = () => {
        deleting = true;
        const newList = todoLists.filter(list => list.id !== todoList.id);
        setTodoLists(newList);
        window.localStorage.setItem('todoLists', JSON.stringify(newList));
        fetch(`${url}/api/todolist`, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoList)
        })
    }
  return (
    <div className="todolistcard" onClick={handleClick}>
        <p className="todolistcard__title">{todoList.title}</p>
        <div className="todolistcard__deletebtn" onClick={handleDelete}>
            <p className="todolistcard__deleteicon">X</p>
        </div>
    </div>
  );
}

export default TodoListCard;
