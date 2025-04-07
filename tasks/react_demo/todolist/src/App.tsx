import React from 'react';
import logo from './logo.svg';
import './App.css';

//asdasd

function App() {
  let name = '리액트';
  let style = {
    backgroundColor: 'black',
    color: 'white',
    fontSize: '48px',
    fontWeight: 'bold',
    padding: '20px',

  }
  return (
    <div style={{
      backgroundColor: 'black',
      color: 'white',
      fontSize: '48px',
      fontWeight: 'bold',
      padding: '20px',
    }}>
      <h1 style={style}>Hello,
        {
          name === '리액트' ? (<h1>yes</h1>) : (<h1>no</h1>)
        }
      </h1>
      <p>반갑습니다.</p>
    </div>
    //주석 달았다
  );
}

export default App;
