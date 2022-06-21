import React from 'react';
import TodoList from '../TodoList/TodoList';
import './App.scss';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<p>hello world</p>} />
        <Route path=':listId' element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
