import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ])

    let [filter, setFilter] = useState<FilterType>('all')

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const removeTask = (tId: string) => {
        let filteredTasks = tasks.filter(el => el.id !== tId)
        setTasks(filteredTasks)
    }

    const changeIsDoneStatus = (id: string, isDone: boolean) => {
         let changedTasks = tasks.map(el => el.id === id ? {...el, isDone : isDone} : el)
         setTasks(changedTasks)

      /*  let chTask = tasks.find(el => el.id === id)
        if (chTask) {
            chTask.isDone = isDone
        }
        setTasks([...tasks])*/
    }

    let tasksForToDoList = tasks

    if (filter === 'active') {
        tasksForToDoList = tasks.filter(t => !t.isDone)
    }

    if (filter === 'completed') {
        tasksForToDoList = tasks.filter(t => t.isDone)
    }

    const changeFilter = (filter: FilterType) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <TodoList
                title={'What to learn-111111'}
                tasks={tasksForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeIsDoneStatus={changeIsDoneStatus}
            />
        </div>
    );
}

export default App;
