import React from 'react';
import './TodoItem.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setList } from '../../redux/slices';

function TodoItem({todo}: TodoItemProps) {
    const dispatch = useAppDispatch();
    const todoList = useAppSelector(state => state.app).todoList;

    const handleClick = () => {
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

        // socket emit the changed list
    }
  return (
    <div className="todoitem" onClick={handleClick}>
      <p>{todo.title}</p>
      <p>{todo.desc}</p>
      <p>completed: {todo.completed.toString()}</p>
    </div>
  );
}

export default TodoItem;
