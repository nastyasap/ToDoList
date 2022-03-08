import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskObjType = {
    [key: string]: Array<TaskType> //типизация ассоциативного массива
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskObjType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    function removeTask(id: string, todolistID: string) {
        let filteredTasks = tasks[todolistID].filter(t => t.id != id);
        setTasks({...tasks, [todolistID]: filteredTasks});
    }

    function addTask(title: string, todolistID: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks[todolistID]];
        setTasks({...tasks, [todolistID]: newTasks});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        let task = tasks[todolistID].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks({...tasks, [todolistID]: [...tasks[todolistID]]});
    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    function removeTodolist(todolistID:string){
        setTodolists(todolists.filter(el=>el.id!==todolistID))
        delete tasks[todolistID]
    }

    const getFilteredTasks = (todolists: TodolistsType) => {
        switch (todolists.filter) {
            case 'completed' :
                return tasks[todolists.id].filter(el => el.isDone)
            case 'active' :
                return tasks[todolists.id].filter(el => !el.isDone)
            default:
                return tasks[todolists.id]
        }
    }

    return (
        <div className="App">
            {todolists.map(el => {
                const tasksForTodolist = getFilteredTasks(el)
                /*let tasksForTodolist = tasks[el.id];
                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }*/

                return (
                    <Todolist
                        key={el.id}
                        title="What to learn"
                        todolistID={el.id}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                    />)
            })}

        </div>
    );
}

export default App;
