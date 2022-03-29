import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";


// CRUD
// C - create
// R - read -> static site
// U - update
// D - delete
export type FilterValuesType = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'}
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "React", isDone: false}
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Ice cream", isDone: true},
        ]
    })

/////////////////////////////////////////////////////////////

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const removeTask = (taskID: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskID)})
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(), title, isDone: false
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID]
                .map(t => t.id === taskID ? {...t, isDone} : t)
        })
    }
    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodoLists(todoLists.map(tl =>
            tl.id === todoListID ? {...tl, filter} : tl))
    }


    const getFilteredTasksForRender = (todoList: TodoListType) => {
        switch (todoList.filter) {
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone === true)
            case "active":
                return tasks[todoList.id].filter(t => t.isDone === false)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListsForRender = todoLists.map(tl => {
        const filteredTasksForRender = getFilteredTasksForRender(tl)
        return (
            <TodoList
                key = {tl.id}
                id = {tl.id}
                title={tl.title}
                tasks={filteredTasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                filter={tl.filter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
            />
        );
    })

    return (
        <div className="App">
            {todoListsForRender}
        </div>
    )
}

export default App;
