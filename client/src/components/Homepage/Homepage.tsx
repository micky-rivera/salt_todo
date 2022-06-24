import React, { useEffect, useState } from 'react';
import './Homepage.scss';
import TodoListCard from '../TodoListCard/TodoListCard';
import HomepageForm from '../HomePageForm/HomepageForm';

function Homepage() {
    const [todoLists, setTodoLists] = useState<HomepageTodoList[]>([]);

    useEffect(()=> {
        const storage = window.localStorage.getItem('todoLists');
        if (storage) {
            setTodoLists(JSON.parse(storage))
        }
    }, [])

  return (
    <div className="homepage">
        <p className="homepage__title">Micky's todo app</p>
        <HomepageForm setTodoLists={setTodoLists} />
        <div className='homepage__todolistdisplay'>
            {todoLists.map((todoList, index) => (
                <TodoListCard key={index} todoList={todoList} todoLists={todoLists} setTodoLists={setTodoLists} />
            ))}
        </div>
    </div>
  );
}

export default Homepage;
