import React, { useEffect, useState } from 'react';
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
    const [filter, setFilter] = useState('default');
    const [listToRender, setListToRender] = useState<typeof TodoItem[]>([]);
    const [loading, setLoading] = useState(true);
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
            setLoading(false);
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

    useEffect(()=>{
        if (filter === 'completed' || filter === 'pending') {
            const completed = todoList.content.filter(item => item.completed);
            const pending = todoList.content.filter(item => !item.completed);
            if (filter === 'completed') {
                setListToRender([...completed, ...pending]);
            } else {
                setListToRender([...pending, ...completed]);
            }
        } else {
            setListToRender(todoList.content);
        }
    }, [filter, todoList])


  return (
    <div className="todolist">
        <p className="todolist__title">{loading ? 'Loading...' : todoList.title}</p>
        <div className={loading ? 'hidden' : "todolist__form"}>
            <TodoForm />
        </div>
        <div className={loading ? 'hidden' : "todolist__filter"}>
            <p className="todolist__filtertitle">Filter by:</p>
            <div className="todolist__filterinput">
                <input type="radio" name="filter" defaultChecked={true} onClick={()=>setFilter('default')}/>
                <p>Default</p>
            </div>
            <div className="todolist__filterinput">
                <input type="radio" name="filter" onClick={()=>setFilter('pending')}/>
                <p>Pending</p>
            </div>
            <div className="todolist__filterinput">
                <input type="radio" name="filter" onClick={()=>setFilter('completed')}/>
                <p>Completed</p>
            </div>
        </div>
        <div className={loading ? 'hidden' : "todolist__container"}>
            {listToRender.map((todoItem, index) => (
                <TodoItem key={index} todo={todoItem} />
            ))}
        </div>
    </div>
  );
}

export default TodoList;
