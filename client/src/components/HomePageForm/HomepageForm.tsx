import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import './HomepageForm.scss';
import { addTodo } from '../../redux/slices';
import { v4 as uuidv4 } from 'uuid';

const url = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

function HomepageForm({setTodoLists}: HomepageFormProps) {
    const [titleInput, setTitleInput] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTodoList = {
            id: uuidv4(),
            title: titleInput,
            content: []
        }

        fetch(`${url}/api/todolist`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodoList)
        })
        .then(res => res.json())
        .then(data => {
            setTodoLists(previousState => {
                window.localStorage.setItem('todoLists', JSON.stringify([...previousState, data]));
                return [...previousState, data];
            })
        });

        setTitleInput('');
    }

  return (
    <form className="homepageform" onSubmit={handleSubmit}>
        <input required className="homepageform__input--title" type="text" placeholder="Todo List Title" value={titleInput} onChange={e => {
            setTitleInput(e.target.value);
        }}  />
        <button className="homeoageform__button">Create New List</button>
    </form>
  );
}

export default HomepageForm;
