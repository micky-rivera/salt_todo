import React from 'react';
import './TodoItem.scss';

function TodoItem({todo}: TodoItemProps) {
    const handleClick = () => {
        // update list in redux
        // socket emit the changed list
    }
  return (
    <div className="todoitem" onClick={handleClick}>
      <p>{todo.title}</p>
      <p>{todo.desc}</p>
      <p>{todo.completed}</p>
    </div>
  );
}

export default TodoItem;
