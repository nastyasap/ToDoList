import React, {useState} from 'react';
import './App.css';
//import {Filter} from "./microtasks/Filter";
import {FullInput} from "./microtasks/Input/FullInput";
import {Input} from "./microtasks/Input/Input";
import {Button} from "./microtasks/Input/Button";

function App() {
    //microtacks for UseState
    /* const [money, setMoney] = useState([
         {banknots: 'Dollars', value: 100, number: ' a1234567890'},
         {banknots: 'Dollars', value: 50, number: ' z1234567890'},
         {banknots: 'RUBLS', value: 100, number: ' w1234567890'},
         {banknots: 'Dollars', value: 100, number: ' e1234567890'},
         {banknots: 'Dollars', value: 50, number: ' c1234567890'},
         {banknots: 'RUBLS', value: 100, number: ' r1234567890'},
         {banknots: 'Dollars', value: 50, number: ' x1234567890'},
         {banknots: 'RUBLS', value: 50, number: ' v1234567890'},
     ])

     const [filter, setFilter] = useState('All')
        //???type FilterButtonType = 'All' | 'Dollars' | 'Rubles'
     let currentMoney = money
     if (filter === 'Rubles') {
         currentMoney = money.filter((item) => item.banknots === 'RUBLS')
     }

     if (filter === 'Dollars') {
         currentMoney = money.filter((item) => item.banknots === 'Dollars')
     }

     const onClickFilterHandler = (value: string) => {
         setFilter(value)
     }

     return (
         <div className="App">
             <Filter
                 money={currentMoney}
                 onClickFilterHandler={onClickFilterHandler}
             />
         </div>
     );*/

    //microtasks input
    let [message, setMessage] = useState([
        {message: 'message1'},
        {message: 'message2'},
        {message: 'message3'},
        {message: 'message4'}
    ])

    let [title, setTitle] = useState('')

    const addMessage = (title: string) => {
        let newMessage = {message: title}
        setMessage([newMessage, ...message])
    }

    const callBackButtonHandler = () => {
        addMessage(title)
        setTitle('')
    }

    return (
        <div className={'App'}>
            {/*<FullInput addMessage={addMessage}/>*/}
            <div>
                <Input title={title} setTitle={setTitle}/>
                <Button name={'+'} callBack={callBackButtonHandler}/>
            </div>
            {message.map((mes, index) => {
                    return (<div className='message' key={index}>{mes.message}</div>)
                }
            )}
        </div>
    )
}

export default App;
