import React, { useState } from 'react';
import './TodoListCard.scss';
import { useNavigate } from 'react-router-dom';

function TodoListCard({todoList}: TodoListCardProps) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${todoList.id}`);
    }
  return (
    <div className="todolistcard" onClick={handleClick}>
        <p>{todoList.title}</p>
    </div>
  );
}

export default TodoListCard;
