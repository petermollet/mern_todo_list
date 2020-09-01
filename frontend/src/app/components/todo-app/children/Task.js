import React from 'react';
import AddTodo from './children/AddTodo';

const Task = ({ items, move, isCompleted, add, remove }) => {

    const list = isCompleted ? items.filter(i => i.isCompleted) : items.filter(i => !i.isCompleted);

    return (
        <div className="task">
            <div className="text-center">
                <h3>List { isCompleted ? "Done" : "undone"}</h3>
            </div>
            <hr />
            { !isCompleted && <AddTodo add={ add } /> }
            <ul className="no-padding" id={ isCompleted ? "done-items" : "not-done"}>
                { list.map( (item, index) =>
                    <li className="list-unstyled d-flex justify-content-between" key={index} >
                        <label title={ isCompleted ? "to undone ?"  : "to done ?" } onClick={() => move(item._id)}>{ item.text }</label>
                        <button title="to delete ?" className="btn text-danger" onClick={() => remove(item._id)}><i className="fas fa-trash"/></button>
                    </li>
                )}
            </ul>
            { !isCompleted &&
                <div className="todo-footer">
                    <span>{ list.length }</span> { list.length > 1 ? "Tasks" : "Task"} left
                </div>
            }
        </div>
    );
};

export default Task;