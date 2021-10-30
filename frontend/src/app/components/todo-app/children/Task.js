import React from 'react';
import AddTodo from './children/AddTodo';
import ReactTooltip from 'react-tooltip';

const Task = ({ items, move, isCompleted, add, remove }) => {

    const list = items.filter(i => isCompleted ? i.isCompleted : !i.isCompleted);

    return (
        <div className="bg-white shadow-sm rounded">

            <div className={`text-center border-bottom p-3 ${isCompleted ? 'text-success':'text-danger'}`}>
                <h3>List { isCompleted ? "Done" : "Todo"}</h3>
            </div>

            <div className="mx-3 mt-3">
                { !isCompleted && <AddTodo add={ add } /> }
                <ul className="pl-0 mt-3 mb-0 cursor-pointer" id={ isCompleted && "done-task"}>
                    { list.map( (item, index) =>
                        <li className="task lead d-flex justify-content-between align-items-center border-top py-2" key={index} >
                            <label 
                                className="mb-0 w-100 cursor-pointer" 
                                data-tip={ isCompleted ? "TODO ?"  : "DONE ?" } 
                                onClick={() => move(item._id)}
                            >
                                { item.text }
                            </label>
                            <ReactTooltip className="bg-primary" />
                            <button 
                                data-tip="DELETE ?" 
                                className="btn text-danger" 
                                onClick={() => remove(item._id)}
                            >
                                <i className="fas fa-trash"/>
                            </button>
                        </li>
                    )}
                </ul>
            </div>

            <div className="border-top py-3 pl-3 text-secondary bg-light">
                <span>{ list.length } { list.length > 1 ? "Tasks" : "Task"} {isCompleted ? 'completed':'left'}</span>
            </div>
            
        </div>
    );
};

export default Task;