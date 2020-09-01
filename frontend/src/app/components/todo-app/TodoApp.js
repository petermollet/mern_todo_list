import React, { useState } from 'react';
import '../../styles/Todo.css';
import Task from './children/Task';
import { idGenerator } from './../../shared/services/random-services';

const TodoApp = () => {

    const [items, setItems] = useState([ 
        { text:"Item #1", done:false, key: new Date().getMilliseconds() + idGenerator() + '1' }, 
        { text:"Item #2", done:false, key: new Date().getMilliseconds() + idGenerator() + '2' }, 
        { text:"Item #3", done:false, key: new Date().getMilliseconds() + idGenerator() + '3' }, 
        { text:"Item #4", done:false, key: new Date().getMilliseconds() + idGenerator() + '4' }, 
        { text:"Item #5", done:false, key: new Date().getMilliseconds() + idGenerator() + '5' } 
    ]);

    const move = (key) => {
        const filtered = [...items];
        const index = filtered.findIndex(item => item.key === key);
        filtered[index].done = !filtered[index].done;
        setItems(filtered);
    }

    const add = (item) => setItems([...items, item]);

    const remove = (key) => setItems(items.filter(item => item.key !== key));

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="todolist">
                        <Task move={ move } items={ items } add={ add } remove={ remove }/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="todolist">
                        <Task move={ move } items={ items } remove={ remove } done />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoApp;