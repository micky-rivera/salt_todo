import React, { useState } from 'react';
import './Homepage.scss';
import TodoListCard from '../TodoListCard/TodoListCard';
import HomepageForm from '../HomePageForm/HomepageForm';

function Homepage() {
    const [todoLists, setTodoLists] = useState<HomepageTodoList[]>([]);

  return (
    <div className="homepage">
        <p>This is the homepage</p>
        <HomepageForm setTodoLists={setTodoLists} />
        <div className='homepage__todolistdisplay'>
            {todoLists.map((todoList, index) => (
                <TodoListCard key={index} todoList={todoList} />
            ))}
        </div>
    </div>
  );
}

export default Homepage;
