import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from './Task';
import {ReduxStoreProviderDecorator} from "../../store/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {TaskType} from "../TodoList/Todolist";
import {AppRootStateType} from "../../store/storeRedux";
import {v1} from "uuid";


export default {
    title: 'TODOLISTS/ Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
    args: {
        todolistId: 'todolistId1'
    }
} as ComponentMeta<typeof Task>;

const TaskUsingRedux = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    return <Task task={task} todolistId={'todolistId1'}/>
}

const Template: ComponentStory<typeof TaskUsingRedux> = (args) => <TaskUsingRedux/>;
export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {}


// const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>
//
// export const TaskIsDoneStory = Template.bind({});
//
// TaskIsDoneStory.args = {
//     task: {id: 'v1()', title: "React Book", isDone: true}
// }


