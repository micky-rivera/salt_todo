import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import './TodoForm.scss';
import { addTodo } from '../../redux/slices';

const url = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

function TodoForm() {
    const [titleInput, setTitleInput] = useState('');
    const [descInput, setDescInput] = useState('');
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTodo = {
            title: titleInput,
            desc: descInput
        }

        dispatch(addTodo(newTodo));

        // send new todo to BE who adds it to mongo
        fetch(`${url}/api/todolist`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 'not yet',
                todoItem: newTodo
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
        
        // socket emit the change

        setTitleInput('');
        setDescInput('');
    }

  return (
    <form className="todoform" onSubmit={handleSubmit}>
        <input required className="todoform__input--title" type="text" placeholder="Title" value={titleInput} onChange={e => {
            setTitleInput(e.target.value);
        }}  />
        <input required className="todoform__input--desc" type="text" placeholder="Description" value={descInput} onChange={e => {
            setDescInput(e.target.value);
        }}  />
        <button className="todoform__button">Create</button>
    </form>
  );
}

export default TodoForm;
