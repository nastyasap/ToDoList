type ButtonType ={
    name: string
    callBack: ()=>void
}

export const Button = (props:ButtonType) => {
/*    const firstSubscriber = (name: string) => {
        console.log(name)
    }

    const foo1 = () => {
        console.log('100200')
    }

    const foo2 = (a: number) => {
        console.log(a)
    }*/

    return (
        <>
            <button onClick={props.callBack}>{props.name}</button>
        </>
        )
}