import React from 'react';
import TodoApp from './components/todo-app/TodoApp';
import NavBar from './components/header/NavBar';

const App = () => {
    return (
        <>
            <NavBar/>
            <TodoApp />
        </>
        
    );
}

export default App;
