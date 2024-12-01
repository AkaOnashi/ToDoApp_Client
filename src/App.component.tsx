import React from 'react';
import './App.styles.scss';
import Header from './app/layout/Header/Header';
import ToDoList from './features/ToDoList/ToDoList.component';
import chillGuy from './assets/images/chill-guy.png';

function App() {
  return (
    <>
    <div className="App">
        <Header />
        
        <ToDoList />
    </div>
    </>
  );
}

export default App;
