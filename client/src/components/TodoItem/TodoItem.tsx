import React from 'react';
import './TodoItem.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setList } from '../../redux/slices';

function TodoItem({todo, socket}: TodoItemProps) {
    const dispatch = useAppDispatch();
    const todoList = useAppSelector(state => state.app).todoList;
    let deleting = false;

    const handleClick = () => {
        if (!deleting) {
            const newTodo = {
                title: todo.title,
                desc: todo.desc,
                completed: !todo.completed
            }
    
            const newContent = todoList.content.map(item => {
                if (item.title === todo.title) {
                    return newTodo;
                }
                return item;
            })
    
            const newList = {
                id: todoList.id,
                title: todoList.title,
                content: newContent
            }

            dispatch(setList(newList));
    
            socket.emit('update-list');

        }
    }

    const handleDelete = () => {
        deleting = true;
        const newContent = todoList.content.filter(item => todo.title !== item.title);
        const newList = {
            id: todoList.id,
            title:todoList.title,
            content: newContent
        }
        
        dispatch(setList(newList));
        socket.emit('update-list');

    }

  return (
    <div className={todo.completed ? "todoitem--completed" : "todoitem"} onClick={handleClick}>
        <p className="todoitem__title">{todo.title}</p>
        <p className="todoitem__desc">{todo.desc}</p>
        <div className={todo.completed ? "todoitem__deletebtn" : "hidden"} onClick={handleDelete}>
            <p className="todoitem__deleteicon">X</p>
        </div>
    </div>
  );
}

export default TodoItem;
