import React from 'react';
import TodoList from '../TodoList/TodoList';
import Homepage from '../Homepage/Homepage';
import './App.scss';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path=':listId' element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
