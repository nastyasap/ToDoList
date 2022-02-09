import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterValuesType = 'All' | 'Active' | 'Completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    let [filter, setFilter] = useState<FilterValuesType>('All')

    function removeTask(id: number) {
        setTasks(tasks.filter(el => el.id !== id))
    }

    let filteredTasks = tasks
    if (filter === 'Active') {
        filteredTasks = tasks.filter(el => el.isDone === false);
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter(el => el.isDone === true);
    }

    function filteredValues(value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      filteredValues={filteredValues}/>
        </div>
    );
}

export default App;
