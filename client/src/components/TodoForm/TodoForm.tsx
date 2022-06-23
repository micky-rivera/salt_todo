import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import './TodoForm.scss';
import { addTodo } from '../../redux/slices';

const url = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

function TodoForm() {
    const [titleInput, setTitleInput] = useState('');
    const [descInput, setDescInput] = useState('');
    const dispatch = useAppDispatch();
    const todoList = useAppSelector(state => state.app).todoList;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTodo = {
            title: titleInput,
            desc: descInput,
            completed: false
        }

        dispatch(addTodo(newTodo));

        // socket emit the change

        setTitleInput('');
        setDescInput('');
    }

  return (
    <form className="todoform" onSubmit={handleSubmit}>
        <div className="todoform__title">
            <input required type="text" placeholder="Title" value={titleInput} onChange={e => {
                setTitleInput(e.target.value);
            }}  />
        </div>
        <div className="todoform__desc">
            <textarea placeholder="Description" value={descInput} onChange={e => {
                setDescInput(e.target.value);
            }}  />
        </div>
        <button className="todoform__button">Create</button>
    </form>
  );
}

export default TodoForm;
