import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {App} from "./App";
import {ReduxStoreProviderDecorator} from "./store/ReduxStoreProviderDecorator";


export default {
    title: 'TODOLISTS/ App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App/>;

export const AppWithReduxStory = Template.bind({});

AppWithReduxStory.args = {}


