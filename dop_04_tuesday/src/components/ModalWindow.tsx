type ModalWindowType = {
    title:string
}

export const ModalWindow: React.FC<ModalWindowType> = ({title, children}) => {
    return (
        <div>
            <h1></h1>
            <input type="text"/>
            <input type="text"/>
            {children}
            <div>
                <button>Yes</button>
                <button>No</button>
            </div>
        </div>
    )
}