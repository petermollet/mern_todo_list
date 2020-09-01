import React from 'react';
import AddTodo from './children/AddTodo';

const Task = ({ items, move, done, add, remove }) => {

    const list = done ? items.filter(i => i.done) : items.filter(i => !i.done);

    return (
        <div className="task">
            <div className="text-center">
                <h3>List { done ? "Done" : "undone"}</h3>
            </div>
            <hr />
            { !done && <AddTodo add={ add } /> }
            <ul className="no-padding" id={ done ? "done-items" : "not-done"}>
                { list.map( (item, index) =>
                    <li className="list-unstyled d-flex justify-content-between" key={index} >
                        <label title={ done ? "to undone ?"  : "to done ?" } onClick={() => move(item.key)}>{ item.text }</label>
                        <button title="to delete ?" className="btn text-danger" onClick={() => remove(item.key)}><i className="fas fa-trash"/></button>
                    </li>
                )}
            </ul>
            { !done &&
                <div className="todo-footer">
                    <span>{ list.length }</span> { list.length > 1 ? "Tasks" : "Task"} left
                </div>
            }
        </div>
    );
};

export default Task;