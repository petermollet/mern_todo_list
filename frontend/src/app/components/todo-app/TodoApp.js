import React, { useState, useEffect } from 'react';
import Task from './children/Task';
import Axios from 'axios';

const TodoApp = () => {

    const [ items, setItems ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        loadTodos();
    }, [])

    const loadTodos = async () => {
        const result =  await Axios.get('http://localhost:4000/todos/');
        setItems(result.data);
        setLoading(false);
    }

    const move = (id) => {
        Axios.put(`http://localhost:4000/todos/${id}`)
             .then(res => {
                if(res.status === 200) {
                    const filtered = [...items];
                    const index = filtered.findIndex(item => item._id === id);
                    filtered[index].isCompleted = !filtered[index].isCompleted;
                    setItems(filtered);
                }
             })
             .catch(err => console.log(err))
    }

    const add = (item) => {
        Axios.post('http://localhost:4000/todos/add', item)
             .then(res => {
                 if(res.status === 200) setItems([...items, res.data]);
             })
             .catch(err => console.log(err));
    }

    const remove = (id) => {
        Axios.delete(`http://localhost:4000/todos/${id}`)
             .then(res => {
                if(res.status === 200) setItems(items.filter(item => item._id !== id));
             })
             .catch(err => console.log(err))
        
    }

    if(loading) return <div className="text-center"><h1>Loading...</h1></div>
    else {
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="">
                        <Task move={ move } items={ items } add={ add } remove={ remove }/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="">
                        <Task move={ move } items={ items } remove={ remove } isCompleted />
                    </div>
                </div>
            </div>
        </div>
    );}
};

export default TodoApp;