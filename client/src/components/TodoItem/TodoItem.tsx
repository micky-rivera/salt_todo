import React from 'react';
import './TodoItem.scss';

function TodoItem({todo}: TodoItemProps) {
  return (
    <div className="todoitem">
      <p>{todo.title}</p>
      <p>{todo.desc}</p>
    </div>
  );
}

export default TodoItem;
