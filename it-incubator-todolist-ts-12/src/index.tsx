import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {ThemeProvider} from "@material-ui/core/styles";
import {createTheme} from "@material-ui/core/styles";
import {CssBaseline} from "@material-ui/core";
import {Provider} from "react-redux";
import {App} from "./App";
import {store} from "./store/storeRedux";

const theme = createTheme({
        palette: {
            primary: {
                main: '#7c4dff',
            },
            secondary: {
                main: '#00bfa5',
            },
            /*{
                main: '#f4ff81',
            },*/
            type: 'dark'
        },
    }
)

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Provider store={store}>
            <App/>
        </Provider>
    </ThemeProvider>, document.getElementById('root'));


