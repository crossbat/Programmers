import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './todolist';
import Clock from './timer';

function App() {
  return (
    <div className='container'>
      <TodoList />
      <Clock />
    </div>
  );
}

export default App;
